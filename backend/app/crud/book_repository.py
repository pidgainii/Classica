from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from db.models.book import Book

class BookRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_ten_books(self) -> list[Book] | None:
        result = await self.session.execute(
            select(Book)
            .order_by(func.random()).limit(10)
        )
        return result.scalars().all()