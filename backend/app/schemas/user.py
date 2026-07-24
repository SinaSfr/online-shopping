from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    """
    Payload for POST /auth/register.
    """

    first_name: str = Field(min_length=1, max_length=100, examples=["Amir"])
    last_name: str = Field(min_length=1, max_length=100, examples=["Erfan"])
    email: EmailStr = Field(
        description="Must be unique across all accounts.",
        examples=["amir@example.com"],
    )
    password: str = Field(
        min_length=8,
        max_length=128,
        description="Plain text on the wire, hashed with Argon2 before storage - never stored or returned as-is.",
        examples=["supersecret123"],
    )


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

    email: EmailStr = Field(examples=["amir@example.com"])
    password: str = Field(examples=["supersecret123"])


class TokenResponse(BaseModel):
    """
    Response for POST /auth/login - the pair the client stores.
    """

    access_token: str = Field(
        description="Short-lived JWT. Send as 'Authorization: Bearer <token>' on requests to protected endpoints."
    )
    refresh_token: str = Field(
        description="Long-lived JWT. Only ever exchanged for a new access token - never accepted by protected endpoints."
    )
    token_type: str = Field(default="bearer", description="Always 'bearer'.")
