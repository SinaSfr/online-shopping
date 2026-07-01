from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repository import user_repository
from app.schemas.user import TokenResponse, UserCreate


class EmailAlreadyRegisteredError(Exception):
    """Raised when registering with an email that already has an account."""


class InvalidCredentialsError(Exception):
    """Raised when login credentials don't match any active user."""


def register(db: Session, data: UserCreate) -> User:
    if user_repository.get_by_email(db, data.email) is not None:
        raise EmailAlreadyRegisteredError(data.email)

    try:
        return user_repository.create(
            db,
            first_name=data.first_name,
            last_name=data.last_name,
            email=data.email,
            hashed_password=hash_password(data.password),
        )
    except IntegrityError:
        # Two requests raced the check above; the DB's unique constraint on
        # users.email is the real guard - this just turns that race into the
        # same clean domain error instead of a raw 500.
        db.rollback()
        raise EmailAlreadyRegisteredError(data.email) from None


def login(db: Session, email: str, password: str) -> TokenResponse:
    user = user_repository.get_by_email(db, email)

    if user is None or not user.is_active or not verify_password(password, user.hashed_password):
        # Same error for "no such user" and "wrong password" - don't tell an
        # attacker which part was wrong.
        raise InvalidCredentialsError()

    return TokenResponse(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
    )
