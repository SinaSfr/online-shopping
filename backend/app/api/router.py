from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.categories import router as categories_router
from app.api.v1.health import router as health_router
from app.api.v1.products import router as products_router

api_router = APIRouter()


api_router.include_router(
    health_router,
    prefix="/api/v1",
    tags=["Health"],
)

api_router.include_router(
    auth_router,
    prefix="/api/v1/auth",
    tags=["Auth"],
)

api_router.include_router(
    categories_router,
    prefix="/api/v1/categories",
    tags=["Categories"],
)

api_router.include_router(
    products_router,
    prefix="/api/v1/products",
    tags=["Products"],
)