from pydantic import BaseModel, ConfigDict, Field


class CategoryCreate(BaseModel):
    """
    Payload for POST /categories. Admin only.
    """

    name: str = Field(min_length=1, max_length=100, examples=["Electronics"])
    slug: str = Field(
        min_length=1,
        max_length=120,
        description="URL-friendly identifier, must be unique.",
        examples=["electronics"],
    )


class CategoryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
