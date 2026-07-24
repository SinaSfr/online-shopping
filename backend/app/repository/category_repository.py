from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.category import Category


def get_by_id(db: Session, category_id: int) -> Category | None:
    return db.get(Category, category_id)


def get_by_slug(db: Session, slug: str) -> Category | None:
    return db.scalar(select(Category).where(Category.slug == slug))


def get_all(db: Session) -> list[Category]:
    return list(db.scalars(select(Category).order_by(Category.name)))


def create(db: Session, *, name: str, slug: str) -> Category:
    category = Category(name=name, slug=slug)

    db.add(category)
    db.commit()
    db.refresh(category)

    return category
