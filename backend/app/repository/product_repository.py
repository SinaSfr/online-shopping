from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.product import Product


def get_by_id(db: Session, product_id: int) -> Product | None:
    return db.scalar(
        select(Product).where(Product.id == product_id).options(selectinload(Product.category))
    )


def get_by_slug(db: Session, slug: str) -> Product | None:
    return db.scalar(select(Product).where(Product.slug == slug))


def list_products(
    db: Session,
    *,
    skip: int = 0,
    limit: int = 20,
    category_id: int | None = None,
) -> list[Product]:
    query = select(Product).options(selectinload(Product.category))

    if category_id is not None:
        query = query.where(Product.category_id == category_id)

    query = query.order_by(Product.id).offset(skip).limit(limit)

    return list(db.scalars(query))


def create(db: Session, **fields) -> Product:
    product = Product(**fields)

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


def update(db: Session, product: Product, **fields) -> Product:
    for field, value in fields.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)

    return product


def delete(db: Session, product: Product) -> None:
    db.delete(product)
    db.commit()
