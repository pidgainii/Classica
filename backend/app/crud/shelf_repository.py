from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid

from db.models import Shelf

class ShelfRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
    async def get_by_user_id_and_name(self, user_id: uuid.UUID, name: str) -> Shelf | None:
        statement = select(Shelf).where(Shelf.user_id == user_id, Shelf.name == name)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()
    
    async def get_by_user_id(self, user_id: uuid.UUID) -> list[Shelf] | None:
        statement = select(Shelf).where(Shelf.user_id == user_id)
        result = await self.session.execute(statement)
        return result.scalars().all()
    
    async def create(self, shelf: Shelf) -> Shelf | None:
        self.session.add(shelf)
        await self.session.commit()
        await self.session.refresh(shelf)
        return shelf