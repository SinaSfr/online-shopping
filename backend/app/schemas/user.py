from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    """
    Payload for POST /auth/register.
    """

    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserRead(BaseModel):
    """
    Public representation of a user. Never includes hashed_password.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str
    email: EmailStr


class LoginRequest(BaseModel):
    """
    Payload for POST /auth/login.
    """

    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """
    Response for POST /auth/login - the pair the client stores.
    """

    access_token: str
    refresh_token: str
    token_type: str = "bearer"
