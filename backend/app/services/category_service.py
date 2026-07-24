from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.category import Category
from app.repository import category_repository
from app.schemas.category import CategoryCreate


class CategorySlugAlreadyExistsError(Exception):
    """Raised when creating a category whose slug is already taken."""


def list_categories(db: Session) -> list[Category]:
    return category_repository.get_all(db)


def create_category(db: Session, data: CategoryCreate) -> Category:
    if category_repository.get_by_slug(db, data.slug) is not None:
        raise CategorySlugAlreadyExistsError(data.slug)

    try:
        return category_repository.create(db, name=data.name, slug=data.slug)
    except IntegrityError:
        db.rollback()
        raise CategorySlugAlreadyExistsError(data.slug) from None
