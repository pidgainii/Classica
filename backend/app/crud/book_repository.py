from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, asc, func, or_
import uuid
from math import ceil

from db.models import Book

from schemas.books import BooksSearchFiltersDTO

class BookRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_books(self, books_search_filters: BooksSearchFiltersDTO) -> list[Book] | None:
        '''
        genres_filters = []
        for genre in books_search_filters.genres:
            genres_filters.append(Book.genres.contains(genre))
            
        languages_filters = []
        for language in books_search_filters.languages:
            languages_filters.append(Book.language==language)
        '''
        
        
        
        order = asc if books_search_filters.ascending else desc
        
        result = await self.session.execute(
            select(Book)
            .limit(books_search_filters.perPage)
            .offset((books_search_filters.page-1)*books_search_filters.perPage)
            .order_by(order(Book.title))
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