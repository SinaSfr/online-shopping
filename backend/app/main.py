from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router

tags_metadata = [
    {"name": "Health", "description": "Service liveness check."},
    {"name": "Auth", "description": "Registration and login. Issues JWT access/refresh tokens."},
]

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="E-Commerce platform backend",
    openapi_tags=tags_metadata,
    # Interactive docs expose the full schema and a "try it out" console -
    # only serve them in debug/local environments, not in production.
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
    openapi_url="/openapi.json" if settings.debug else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="E-Commerce platform backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173" 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.on_event("startup")
async def startup_event():
    print("=" * 50)
    print("Application Settings")
    print(f"App Name     : {settings.app_name}")
    print(f"Version      : {settings.app_version}")
    print(f"Debug        : {settings.debug}")
    print(f"Database URL : {settings.database_url}")
    print("=" * 50)
@app.on_event("startup")
async def startup_event():
    print("=" * 50)
    print("Application Settings")
    print(f"App Name     : {settings.app_name}")
    print(f"Version      : {settings.app_version}")
    print(f"Debug        : {settings.debug}")
    print(f"Database URL : {settings.database_url}")
    print("=" * 50)