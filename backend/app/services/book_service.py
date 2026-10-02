from sqlalchemy.ext.asyncio import AsyncSession

from crud.book_repository import BookRepository

from schemas.book import BookBaseDTO

from core.errors import EntityFetchingError

class BookService:
    
    async def get_ten_books(self, session: AsyncSession) -> list[BookBaseDTO]:
        book_repository = BookRepository(session)
        
        books_database = await book_repository.get_ten_books()
        
        if books_database is None:
            raise EntityFetchingError("UNABLE TO FETCH BOOKS")
        
        books_dto = []
        
        for book in books_database:
            books_dto.append(BookBaseDTO.model_validate(book))
        
        return books_dto
    
    async def get_book(self, id: str, session: AsyncSession) -> BookBaseDTO:
        book_repository = BookRepository(session)
        
        book_database = await book_repository.get_by_id(id)
        
        if not book_database:
            raise EntityFetchingError("UNABLE TO FETCH BOOK WITH ID {id}")
        
        return BookBaseDTO.model_validate(book_database)