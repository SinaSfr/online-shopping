from datetime import datetime, timedelta, timezone
from typing import Any, Literal

import jwt
from pwdlib import PasswordHash

from app.core.config import settings

password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using Argon2.
    """
    return password_hash.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """
    Verify a plain-text password against its stored hash.
    """
    return password_hash.verify(password, hashed_password)


def _create_token(
    user_id: int,
    token_type: Literal["access", "refresh"],
    expires_delta: timedelta,
) -> str:
    now = datetime.now(timezone.utc)

    payload = {
        "sub": str(user_id),
        "type": token_type,
        "iat": now,
        "exp": now + expires_delta,
    }

    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def create_access_token(user_id: int) -> str:
    """
    Issue a short-lived token proving the caller authenticated as `user_id`.
    Sent on every request that needs auth (e.g. Authorization: Bearer <token>).
    """
    return _create_token(
        user_id,
        token_type="access",
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
    )


def create_refresh_token(user_id: int) -> str:
    """
    Issue a long-lived token used only to obtain a new access token
    once the current one expires. Never accepted by protected endpoints.
    """
    return _create_token(
        user_id,
        token_type="refresh",
        expires_delta=timedelta(days=settings.refresh_token_expire_days),
    )


def decode_token(token: str) -> dict[str, Any]:
    """
    Verify signature and expiry, and return the token's claims.

    Raises jwt.PyJWTError (or a subclass) on any invalid/expired/tampered
    token. Callers (FastAPI dependencies) translate that into an HTTP 401 -
    this module stays framework-agnostic and knows nothing about HTTP.
    """
    return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])