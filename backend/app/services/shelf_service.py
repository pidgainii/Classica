from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from db.models import Shelf

from crud.user_repository import UserRepository
from crud.shelf_repository import ShelfRepository
from crud.book_repository import BookRepository

from schemas.shelf import ShelfDTO, NewShelfRequestDTO
from schemas.tokens import AccessTokenDTO
from schemas.books import BooksSearchFiltersDTO, BooksResponseDTO

from core.errors import EntityFetchingError, EntityCreationError, EntityUpdateError, ShelfNameAlreadyExistsError

from utils.SQLAlchemyPydanticValidation.shelf_validation import shelf_validation
from utils.SQLAlchemyPydanticValidation.book_validation import book_validation

class ShelfService:
    async def create_shelf(self, access_token: AccessTokenDTO, new_shelf_request: NewShelfRequestDTO, session: AsyncSession) -> ShelfDTO:
        user_repository = UserRepository(session)
        shelf_repository = ShelfRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        shelf = await shelf_repository.get_by_user_id_and_name(user.id, new_shelf_request.name)
        
        if shelf:
            raise ShelfNameAlreadyExistsError(f"SHELF NAME {new_shelf_request.name} ALREADY EXISTS")
        
        shelf = Shelf(
            name=new_shelf_request.name,
            user_id=user.id,
            user=user,
            books=[]
        )
        
        shelf = await shelf_repository.create(shelf)
        
        if not shelf:
            raise EntityCreationError("UNABLE TO CREATE SHELF")
        
        shelf_dto = ShelfDTO(
            id=shelf.id,
            name=shelf.name,
            books=[]
        )
        
        return shelf_dto
    
    async def get_shelves(self, access_token: AccessTokenDTO, session: AsyncSession) -> list[ShelfDTO]:
        user_repository = UserRepository(session)
        shelf_repository = ShelfRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        shelves_db = await shelf_repository.get_by_user_id(user.id)
        
        if shelves_db is None:
            raise EntityFetchingError("UNABLE TO LOAD SHELVES")
    
        # We will only load 10 books for each shelve, for data transfering efficiency    
        counter = 0
        shelves_dto = []
        for shelf_db in shelves_db:
            shelves_dto.append(shelf_validation(shelf_db))
            counter+=1
            if counter == 10: break
            
        return shelves_dto
    
    async def get_shelf_books(self, access_token: AccessTokenDTO, books_search_filters: BooksSearchFiltersDTO, session: AsyncSession) -> BooksResponseDTO:
        user_repository = UserRepository(session)
        shelf_repository = ShelfRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        shelf = await shelf_repository.get_by_user_id_and_name(user.id, books_search_filters.searchQuery)
        
        if not shelf:
            raise EntityFetchingError("UNABLE TO LOAD SHELF")
        
        i1 = books_search_filters.perPage*(books_search_filters.page-1)
        i2 = books_search_filters.perPage*books_search_filters.page
        paginated_shelf_books_db = shelf.books[i1:i2]
        number_of_pages = int(len(shelf.books) / books_search_filters.perPage)+1
        
        paginated_shelf_books_dto = []
        for book in paginated_shelf_books_db:
            paginated_shelf_books_dto.append(book_validation(book))
        
        return BooksResponseDTO(pages=number_of_pages, books=paginated_shelf_books_dto)
    
    async def get_is_book_saved(self, access_token: AccessTokenDTO, shelf_name: str, book_id: uuid.UUID, session: AsyncSession) -> bool: 
        user_repository = UserRepository(session)
        shelf_repository = ShelfRepository(session)
        book_repository = BookRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        shelf = await shelf_repository.get_by_user_id_and_name(user.id, shelf_name)
        
        if not shelf:
            raise EntityFetchingError("UNABLE TO LOAD SHELF")
        
        book = await book_repository.get_by_id(book_id)
        
        if not book:
            raise EntityFetchingError("UNABLE TO LOAD BOOK")
        
        return (book in shelf.books)
    
    async def save_or_unsave_book_to_shelf(self, access_token: AccessTokenDTO, shelf_name: str, book_id: uuid.UUID, session: AsyncSession) -> bool:
        user_repository = UserRepository(session)
        shelf_repository = ShelfRepository(session)
        book_repository = BookRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        shelf = await shelf_repository.get_by_user_id_and_name(user.id, shelf_name)
        
        if not shelf:
            raise EntityFetchingError("UNABLE TO LOAD SHELF")
        
        book = await book_repository.get_by_id(book_id)
        
        if not book:
            raise EntityFetchingError("UNABLE TO LOAD BOOK")
        
        if (book in shelf.books):
            shelf = await shelf_repository.remove_book(shelf, book)
            if not shelf:
                raise EntityUpdateError("UNABLE REMOVE BOOK FROM SHELF")
            return False
        
        shelf = await shelf_repository.save_book(shelf, book)
        if not shelf:
            raise EntityUpdateError("UNABLE SAVE BOOK TO SHELF")
        return True