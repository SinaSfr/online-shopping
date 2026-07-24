from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.db.session import get_db
from app.schemas.category import CategoryCreate, CategoryRead
from app.services import category_service

router = APIRouter()


@router.get("", response_model=list[CategoryRead], summary="List all categories")
def list_categories(db: Session = Depends(get_db)):
    """
    Public. Returns every category - there's no pagination need yet at
    catalog-launch scale.
    """
    return category_service.list_categories(db)


@router.post(
    "",
    response_model=CategoryRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a category",
    responses={
        403: {"description": "Not an administrator"},
        409: {
            "description": "Slug already in use",
            "content": {"application/json": {"example": {"detail": "Category slug already exists."}}},
        },
    },
)
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    """
    Admin only.
    """
    try:
        return category_service.create_category(db, data)
    except category_service.CategorySlugAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Category slug already exists.",
        )
