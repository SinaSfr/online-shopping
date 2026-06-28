from fastapi import FastAPI

from app.core.config import settings
from app.api.router import api_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="E-Commerce platform backend"
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