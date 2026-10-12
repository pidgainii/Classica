from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, asc, func
import uuid
from math import ceil

from db.models.book import Book

class BookRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_books(self, page: int, perPage: int) -> list[Book] | None:
        result = await self.session.execute(
            select(Book)
            .limit(perPage)
            .offset((page-1)*perPage)
            .order_by(asc(Book.title))
        )
        return result.scalars().all()
    
    async def get_number_pages(self, perPage: int) -> int | None:
        result = await self.session.execute(
            select(func.count()).select_from(select(Book.id).subquery())
        )
        numBooks = result.scalar_one()
        return ceil(numBooks / perPage)
    
    async def get_by_id(self, id: uuid.UUID) -> Book | None:
            statement = select(Book).where(Book.id == id)
            result = await self.session.execute(statement)
            return result.scalar_one_or_none()