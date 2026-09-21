import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app_env = os.getenv("APP_ENV", "local")

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")  # default to Docker service name

DATABASE_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:5432/{POSTGRES_DB}"

# Future parameter for 2.0 style API
# When we are in local, SQL statements are logged to the console. This is useful for debugging.
engine = create_async_engine(DATABASE_URL, future=True, echo=(app_env=="local"))

# We don't need saving data automatically
AsyncLocalSession = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def get_session():
    async with AsyncLocalSession() as session:
        yield session
