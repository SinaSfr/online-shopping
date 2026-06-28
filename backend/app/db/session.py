from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

from collections.abc import Generator

# Create the SQLAlchemy engine
engine = create_engine(
    settings.database_url,
    echo=settings.debug,
)

# Create a session factory
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides a database session.
    A new session is created for each request and closed afterwards.
    """
    db: Session = SessionLocal()

    try:
        yield db
    finally:
        db.close()