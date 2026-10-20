from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from crud.favourite_repository import FavouriteRepository

from schemas.tokens import AccessTokenDTO
from schemas.books import BooksSearchFiltersDTO, BooksResponseDTO

from core.errors import EntityFetchingError

from utils.SQLAlchemyPydanticValidation.book_validation import book_validation

class FavouriteService:    
    async def get_is_book_favourite(self, access_token: AccessTokenDTO, book_id: uuid.UUID, session: AsyncSession) -> bool:
        favourite_repository = FavouriteRepository(session)
        is_book_favourite = await favourite_repository.get_is_book_favourite(access_token.email, book_id)
        if is_book_favourite is None:
            raise EntityFetchingError("UNABLE TO CHECK IF BOOK IS FAVOURITE")
        return is_book_favourite
    
    async def add_book_favourite(self, access_token: AccessTokenDTO, book_id: uuid.UUID, session: AsyncSession) -> bool:
        favourite_repository = FavouriteRepository(session)
        result = await favourite_repository.add_book_favourite(access_token.email, book_id)
        if result is None:
            raise EntityFetchingError("UNABLE TO ADD/UNADD BOOK TO FAVOURITES")
        return result
    
    async def get_favourite_books(self, access_token: AccessTokenDTO, books_search_filters: BooksSearchFiltersDTO, session: AsyncSession) -> BooksResponseDTO:
        favourite_repository = FavouriteRepository(session)
        
        response = await favourite_repository.get_favourite_books(access_token.email, books_search_filters)
        
        if response is None:
            raise EntityFetchingError("UNABLE TO FETCH FAVOURITE BOOKS")
        
        books_database = response["books"]
        number_of_pages = response["number_of_pages"]
        
        books_dto = []
        
        for book in books_database:
            books_dto.append(book_validation(book))
        
        return BooksResponseDTO(pages=number_of_pages, books=books_dto)