from sqlalchemy.ext.asyncio import AsyncSession

from crud.book_repository import BookRepository

from schemas.book import BookBaseDTO

class BookService:
    
    async def get_ten_books(self, session: AsyncSession) -> list[BookBaseDTO]:
        book_repository = BookRepository(session)
        
        books_database = await book_repository.get_ten_books()
        
        if books_database is None:
            # TEMPORARY OF COURSE
            raise Exception
        
        books_dto = []
        
        for book in books_database:
            books_dto.append(BookBaseDTO.model_validate(book))
        
        return books_dto