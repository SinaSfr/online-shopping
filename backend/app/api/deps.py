import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.db.session import get_db
from app.models.user import User
from app.repository import user_repository

bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """
    Resolve the user behind an 'Authorization: Bearer <access_token>' header.

    Any failure - bad signature, expired, wrong token type, unknown or
    inactive user - collapses to the same 401. This is dependency-injection
    glue, so unlike the service layer it's allowed to know about HTTPException
    and JWT directly.
    """
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(credentials.credentials)
    except jwt.PyJWTError:
        raise unauthorized from None

    if payload.get("type") != "access":
        raise unauthorized

    user = user_repository.get_by_id(db, int(payload["sub"]))

    if user is None or not user.is_active:
        raise unauthorized

    return user
