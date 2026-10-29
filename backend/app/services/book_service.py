from sqlalchemy.ext.asyncio import AsyncSession

from crud.book_repository import BookRepository

from schemas.books import BookBaseDTO, BooksSearchFiltersDTO, BooksResponseDTO

from core.errors import EntityFetchingError

from utils.SQLAlchemyPydanticValidation.book_validation import book_validation

import uuid
from math import ceil

class BookService:
    
    async def get_books(self, books_search_filters: BooksSearchFiltersDTO, session: AsyncSession) -> BooksResponseDTO:
        book_repository = BookRepository(session)
        
        books_database = await book_repository.get_books(books_search_filters)
        
        number_of_books = await book_repository.get_number_of_books(books_search_filters)
        number_of_pages = ceil(number_of_books / books_search_filters.perPage)
        
        if books_database is None:
            raise EntityFetchingError("UNABLE TO FETCH BOOKS")
        
        if number_of_pages is None:
            raise EntityFetchingError("UNABLE TO FETCH NUMBER OF PAGES FOR BOOKS")
        
        books_dto = []
        
        for book in books_database:
            books_dto.append(book_validation(book))
        
        return BooksResponseDTO(pages=number_of_pages, books=books_dto)
    
    async def get_book(self, id: uuid.UUID, session: AsyncSession) -> BookBaseDTO:
        book_repository = BookRepository(session)
        
        book_database = await book_repository.get_by_id(id)
        
        if not book_database:
            raise EntityFetchingError("UNABLE TO FETCH BOOK WITH ID {id}")
        
        return book_validation(book_database)