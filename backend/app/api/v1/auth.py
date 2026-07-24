from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import (
    AccessTokenResponse,
    LoginRequest,
    RefreshRequest,
    TokenResponse,
    UserCreate,
    UserRead,
)
from app.services import auth_service

router = APIRouter()


@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    responses={
        409: {
            "description": "Email already registered",
            "content": {"application/json": {"example": {"detail": "Email already registered."}}},
        },
    },
)
def register(data: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user account.

    Does **not** log the user in - no tokens are returned. Call `/auth/login`
    afterwards to obtain an access/refresh token pair.
    """
    try:
        return auth_service.register(db, data)
    except auth_service.EmailAlreadyRegisteredError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        )


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Authenticate and receive a token pair",
    responses={
        401: {
            "description": "Invalid email or password",
            "content": {"application/json": {"example": {"detail": "Invalid email or password."}}},
        },
    },
)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    """
    Verify email + password and issue an access token and a refresh token.

    The same error is returned whether the email doesn't exist or the
    password is wrong, so this endpoint can't be used to enumerate accounts.
    """
    try:
        return auth_service.login(db, data.email, data.password)
    except auth_service.InvalidCredentialsError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )


@router.post(
    "/refresh",
    response_model=AccessTokenResponse,
    summary="Exchange a refresh token for a new access token",
    responses={
        401: {
            "description": "Invalid or expired refresh token",
            "content": {"application/json": {"example": {"detail": "Invalid or expired refresh token."}}},
        },
    },
)
def refresh(data: RefreshRequest, db: Session = Depends(get_db)):
    """
    Issue a new access token from a still-valid refresh token.

    The refresh token itself is not rotated - the client keeps using the
    same one until it naturally expires.
    """
    try:
        access_token = auth_service.refresh_access_token(db, data.refresh_token)
    except auth_service.InvalidRefreshTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token.",
        )

    return AccessTokenResponse(access_token=access_token)


@router.get(
    "/me",
    response_model=UserRead,
    summary="Get the currently authenticated user",
    responses={
        401: {
            "description": "Missing, invalid, or expired access token",
            "content": {"application/json": {"example": {"detail": "Could not validate credentials."}}},
        },
    },
)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Return the account associated with the provided access token.

    Requires 'Authorization: Bearer <access_token>'. This is the first
    protected endpoint - it exists to prove get_current_user actually
    gates access, not just that a token is present.
    """
    return current_user
