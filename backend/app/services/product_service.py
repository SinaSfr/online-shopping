from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.product import Product
from app.repository import category_repository, product_repository
from app.schemas.product import ProductCreate, ProductUpdate


class ProductSlugAlreadyExistsError(Exception):
    """Raised when creating/updating a product to a slug that's already taken."""


class ProductNotFoundError(Exception):
    """Raised when a product id doesn't exist."""


class CategoryNotFoundError(Exception):
    """Raised when a category_id doesn't reference an existing category."""


def list_products(
    db: Session,
    *,
    skip: int = 0,
    limit: int = 20,
    category_id: int | None = None,
) -> list[Product]:
    return product_repository.list_products(db, skip=skip, limit=limit, category_id=category_id)


def get_product(db: Session, product_id: int) -> Product:
    product = product_repository.get_by_id(db, product_id)

    if product is None:
        raise ProductNotFoundError(product_id)

    return product


def create_product(db: Session, data: ProductCreate) -> Product:
    if category_repository.get_by_id(db, data.category_id) is None:
        raise CategoryNotFoundError(data.category_id)

    if product_repository.get_by_slug(db, data.slug) is not None:
        raise ProductSlugAlreadyExistsError(data.slug)

    try:
        return product_repository.create(db, **data.model_dump())
    except IntegrityError:
        db.rollback()
        raise ProductSlugAlreadyExistsError(data.slug) from None


def update_product(db: Session, product_id: int, data: ProductUpdate) -> Product:
    product = product_repository.get_by_id(db, product_id)

    if product is None:
        raise ProductNotFoundError(product_id)

    changes = data.model_dump(exclude_unset=True)

    if "category_id" in changes and category_repository.get_by_id(db, changes["category_id"]) is None:
        raise CategoryNotFoundError(changes["category_id"])

    if "slug" in changes:
        existing = product_repository.get_by_slug(db, changes["slug"])
        if existing is not None and existing.id != product_id:
            raise ProductSlugAlreadyExistsError(changes["slug"])

    try:
        return product_repository.update(db, product, **changes)
    except IntegrityError:
        db.rollback()
        raise ProductSlugAlreadyExistsError(changes.get("slug")) from None


def delete_product(db: Session, product_id: int) -> None:
    product = product_repository.get_by_id(db, product_id)

    if product is None:
        raise ProductNotFoundError(product_id)

    product_repository.delete(db, product)
