from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, asc, func, or_
import uuid

from db.models import Book, Genre

from schemas.books import BooksSearchFiltersDTO

from utils.enums import BookSortingOrder

class BookRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_books(self, books_search_filters: BooksSearchFiltersDTO) -> list[Book] | None:
        search_filters = []
        if (books_search_filters.searchQuery != ""):
            search_filters.append(Book.title.ilike(f"%{books_search_filters.searchQuery}%"))
            search_filters.append(Book.author.ilike(f"%{books_search_filters.searchQuery}%"))
        
        genres_filters = []
        for genre in books_search_filters.genres:
            genres_filters.append(Book.genres.any(Genre.title==genre))
        languages_filters = []
        for language in books_search_filters.languages:
            languages_filters.append(Book.language==language)
        
        
        order = func.random()
        if books_search_filters.sortBy == BookSortingOrder.TITLE:
            order = asc(Book.title)
        
        
        result = await self.session.execute(
            select(Book)
            .limit(books_search_filters.perPage)
            .offset((books_search_filters.page-1)*books_search_filters.perPage)
            .order_by(order)
            .filter(or_(*search_filters))
            .filter(or_(*genres_filters))
            .filter(or_(*languages_filters))
        )
        return result.scalars().all()
    
    async def get_number_of_books(self, books_search_filters: BooksSearchFiltersDTO) -> int | None:
        search_filters = []
        if (books_search_filters.searchQuery != ""):
            search_filters.append(Book.title.ilike(f"%{books_search_filters.searchQuery}%"))
            search_filters.append(Book.author.ilike(f"%{books_search_filters.searchQuery}%"))
            
        genres_filters = []
        for genre in books_search_filters.genres:
                genres_filters.append(Book.genres.any(Genre.title==genre))
        languages_filters = []
        for language in books_search_filters.languages:
            languages_filters.append(Book.language==language)
        
        result = await self.session.execute(
            select(func.count()).select_from(
                select(Book.id)
                .filter(or_(*search_filters))
                .filter(or_(*genres_filters))
                .filter(or_(*languages_filters))
                .subquery()
                )
        )
        return result.scalar_one()
    
    async def get_by_id(self, id: uuid.UUID) -> Book | None:
        statement = select(Book).where(Book.id == id)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()