from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from crud.favourite_repository import FavouriteRepository
from crud.user_repository import UserRepository

from schemas.tokens import AccessTokenDTO
from schemas.books import BooksSearchFiltersDTO, BooksResponseDTO

from core.errors import EntityFetchingError, EntityUpdateError

from utils.SQLAlchemyPydanticValidation.book_validation import book_validation

class FavouriteService:    
    async def get_is_book_favourite(self, access_token: AccessTokenDTO, book_id: uuid.UUID, session: AsyncSession) -> bool:
        favourite_repository = FavouriteRepository(session)
        is_book_favourite = await favourite_repository.get_is_book_favourite(access_token.email, book_id)
        if is_book_favourite is None:
            raise EntityFetchingError("UNABLE TO CHECK IF BOOK IS FAVOURITE")
        return is_book_favourite
    
    async def add_or_remove_book_favourite(self, access_token: AccessTokenDTO, book_id: uuid.UUID, session: AsyncSession) -> bool:
        favourite_repository = FavouriteRepository(session)
        is_book_favourite = await favourite_repository.get_is_book_favourite(access_token.email, book_id)
        if (is_book_favourite):
            result = await favourite_repository.remove_book_favourite(access_token.email, book_id)
            if result is None:
                raise EntityUpdateError("UNABLE TO REMOVE BOOK FROM FAVOURITES")
            return False
        result = await favourite_repository.add_book_favourite(access_token.email, book_id)
        if result is None:
            raise EntityUpdateError("UNABLE TO ADD BOOK TO FAVOURITES")
        return True
        
    
    async def get_favourite_books(self, access_token: AccessTokenDTO, books_search_filters: BooksSearchFiltersDTO, session: AsyncSession) -> BooksResponseDTO:
        user_repository = UserRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        i1 = books_search_filters.perPage*(books_search_filters.page-1)
        i2 = books_search_filters.perPage*books_search_filters.page
        paginated_favourite_books_db = user.favourite_books[i1:i2]
        number_of_pages = int(len(user.favourite_books) / books_search_filters.perPage)+1
        
        paginated_favourite_books_dto = []
        for book in paginated_favourite_books_db:
            paginated_favourite_books_dto.append(book_validation(book))
            
        
        return BooksResponseDTO(pages=number_of_pages, books=paginated_favourite_books_dto)