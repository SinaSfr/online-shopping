from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.category import CategoryRead


class ProductCreate(BaseModel):
    """
    Payload for POST /products. Admin only.
    """

    name: str = Field(min_length=1, max_length=200, examples=["Wireless Mouse"])
    slug: str = Field(min_length=1, max_length=220, examples=["wireless-mouse"])
    description: str = Field(min_length=1)
    price: Decimal = Field(gt=0, max_digits=10, decimal_places=2, examples=["29.99"])
    stock_quantity: int = Field(ge=0, default=0)
    image_url: str | None = Field(default=None, max_length=500)
    category_id: int


class ProductUpdate(BaseModel):
    """
    Payload for PATCH /products/{id}. Admin only. All fields optional -
    only what's provided gets changed.
    """

    name: str | None = Field(default=None, min_length=1, max_length=200)
    slug: str | None = Field(default=None, min_length=1, max_length=220)
    description: str | None = Field(default=None, min_length=1)
    price: Decimal | None = Field(default=None, gt=0, max_digits=10, decimal_places=2)
    stock_quantity: int | None = Field(default=None, ge=0)
    image_url: str | None = Field(default=None, max_length=500)
    category_id: int | None = None
    is_active: bool | None = None


class ProductRead(BaseModel):
    """
    Public representation of a product, category resolved inline so the
    client doesn't need a second request just to show the category name.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: str
    price: Decimal
    stock_quantity: int
    image_url: str | None
    is_active: bool
    category: CategoryRead
