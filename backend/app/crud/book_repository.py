from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
import uuid

from db.models.book import Book

class BookRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_ten_books(self) -> list[Book] | None:
        result = await self.session.execute(
            select(Book)
            .order_by(func.random()).limit(30)
        )
        return result.scalars().all()
    
    async def get_by_id(self, id: uuid.UUID) -> Book | None:
            statement = select(Book).where(Book.id == id)
            result = await self.session.execute(statement)
            return result.scalar_one_or_none()