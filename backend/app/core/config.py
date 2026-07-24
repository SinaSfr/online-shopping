from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central application configuration.
    Values are loaded from environment variables.
    """

    model_config = SettingsConfigDict(
        case_sensitive=False,
        extra="ignore",
    )

    # ==========================
    # Application
    # ==========================

    app_name: str
    app_version: str
    debug: bool
    api_v1_prefix: str

    # ==========================
    # PostgreSQL
    # ==========================

    postgres_host: str
    postgres_port: int
    postgres_db: str
    postgres_user: str
    postgres_password: str

    # ==========================
    # JWT / Authentication
    # ==========================

    jwt_secret_key: str
    jwt_algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_days: int

    # ==========================
    # CORS
    # ==========================

    cors_origins: str

    @computed_field
    @property
    def cors_origins_list(self) -> list[str]:
        """
        Browser origins allowed to call this API, e.g. the Vite dev server.
        Configurable per environment - never hardcode this in main.py.
        """
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @computed_field
    @property
    def database_url(self) -> str:
        """
        Build the SQLAlchemy database URL.
        """
        return (
            f"postgresql+psycopg://"
            f"{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}"
            f"/{self.postgres_db}"
        )


settings = Settings()