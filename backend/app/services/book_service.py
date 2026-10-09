from sqlalchemy.ext.asyncio import AsyncSession

from crud.book_repository import BookRepository

from schemas.books import BookBaseDTO, BooksRequestDTO, BooksResponseDTO

from core.errors import EntityFetchingError

class BookService:
    
    async def get_books(self, page: int, perPage: int, session: AsyncSession) -> BooksResponseDTO:
        book_repository = BookRepository(session)
        
        books_database = await book_repository.get_books(page, perPage)
        number_of_pages = await book_repository.get_number_pages(perPage)
        
        if books_database is None:
            raise EntityFetchingError("UNABLE TO FETCH BOOKS")
        
        if number_of_pages is None:
            raise EntityFetchingError("UNABLE TO FETCH NUMBER OF PAGES FOR BOOKS")
        
        books_dto = []
        
        for book in books_database:
            books_dto.append(BookBaseDTO.model_validate(book))
        
        return BooksResponseDTO(pages=number_of_pages, books=books_dto)
    
    async def get_book(self, id: str, session: AsyncSession) -> BookBaseDTO:
        book_repository = BookRepository(session)
        
        book_database = await book_repository.get_by_id(id)
        
        if not book_database:
            raise EntityFetchingError("UNABLE TO FETCH BOOK WITH ID {id}")
        
        return BookBaseDTO.model_validate(book_database)