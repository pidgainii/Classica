from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from db.models.user import User

class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_by_email(self, email: str) -> User | None:
        statement = select(User).where(User.email == email)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()
    
    async def create(self, user: User) -> User | None:
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user