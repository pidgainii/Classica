from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
import uuid

from db.models import User

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
    
    async def create(self, user: User) -> User | None:
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user
    
    async def modify_email(self, id: uuid.UUID, email: str) -> User | None:
        statement = update(User).where(User.id == id).values(email=email)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()
    
    async def modify_password_hash(self, id: uuid.UUID, password_hash: str) -> User | None:
        statement = update(User).where(User.id == id).values(password_hash=password_hash)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()