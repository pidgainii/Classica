from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid

from db.models import User, Book

from .user_repository import UserRepository
from .book_repository import BookRepository

class FavouriteRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_is_book_favourite(self, email: str, book_id: uuid.UUID) -> bool | None:
        statement = select(User).where(User.email == email, User.favourite_books.any(Book.id == book_id))
        result = await self.session.scalar(statement)
        return result is not None
    
    async def add_book_favourite(self, email: str, book_id: uuid.UUID) -> bool | None:
        user_repository = UserRepository(self.session)
        book_repository = BookRepository(self.session)
        
        user = await user_repository.get_by_email(email)
        book = await book_repository.get_by_id(book_id)
        
        user.favourite_books.append(book)
        await self.session.commit()
        return True
        
    async def remove_book_favourite(self, email: str, book_id: uuid.UUID):
        user_repository = UserRepository(self.session)
        book_repository = BookRepository(self.session)
        
        user = await user_repository.get_by_email(email)
        book = await book_repository.get_by_id(book_id)
    
        user.favourite_books.remove(book)
        await self.session.commit()
        return True