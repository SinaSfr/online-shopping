from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import LoginRequest, TokenResponse, UserCreate, UserRead
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
