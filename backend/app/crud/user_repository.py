from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
import uuid

from db.models import User, Book

class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_by_id(self, id: uuid.UUID) -> User | None:
        statement = select(User).where(User.id == id)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()
        
    async def get_by_email(self, email: str) -> User | None:
        statement = select(User).where(User.email == email)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()
    
    # THIS MIGHT NOT WORK
    async def get_is_book_favourite(self, email: str, book_id: uuid.UUID) -> User | None:
        statement = select(User).where(User.email == email and User.favourites.has(Book.id == book_id))
        result = await self.session.execute(statement)
        
        statement = select(User).filter(User.favourites.has(id=book_id))
        
        return result
    
    async def create(self, user: User) -> User | None:
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user