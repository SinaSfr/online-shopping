from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.db.session import get_db
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate
from app.services import product_service

router = APIRouter()


@router.get("", response_model=list[ProductRead], summary="List products")
def list_products(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    category_id: int | None = Query(default=None),
    db: Session = Depends(get_db),
):
    """
    Public.
    """
    return product_service.list_products(db, skip=skip, limit=limit, category_id=category_id)


@router.get(
    "/{product_id}",
    response_model=ProductRead,
    summary="Get a product by id",
    responses={
        404: {
            "description": "Product not found",
            "content": {"application/json": {"example": {"detail": "Product not found."}}},
        },
    },
)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Public.
    """
    try:
        return product_service.get_product(db, product_id)
    except product_service.ProductNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")


@router.post(
    "",
    response_model=ProductRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a product",
    responses={
        403: {"description": "Not an administrator"},
        404: {
            "description": "category_id does not reference an existing category",
            "content": {"application/json": {"example": {"detail": "Category not found."}}},
        },
        409: {
            "description": "Slug already in use",
            "content": {"application/json": {"example": {"detail": "Product slug already exists."}}},
        },
    },
)
def create_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """
    Admin only.
    """
    try:
        return product_service.create_product(db, data)
    except product_service.CategoryNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found.")
    except product_service.ProductSlugAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Product slug already exists.")


@router.patch(
    "/{product_id}",
    response_model=ProductRead,
    summary="Update a product",
    responses={
        403: {"description": "Not an administrator"},
        404: {"description": "Product or category_id not found"},
        409: {"description": "Slug already in use"},
    },
)
def update_product(
    product_id: int,
    data: ProductUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """
    Admin only. Only fields present in the request body are changed - a
    partial update, which is what PATCH means (unlike PUT's full replace).
    """
    try:
        return product_service.update_product(db, product_id, data)
    except product_service.ProductNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    except product_service.CategoryNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found.")
    except product_service.ProductSlugAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Product slug already exists.")


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a product",
    responses={
        403: {"description": "Not an administrator"},
        404: {"description": "Product not found"},
    },
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """
    Admin only. Hard delete - unlike is_active (set via PATCH), this
    actually removes the row.
    """
    try:
        product_service.delete_product(db, product_id)
    except product_service.ProductNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
