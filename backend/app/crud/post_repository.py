from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

import uuid

from db.models import Post

class PostRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create(self, post: Post) -> Post | None:
        self.session.add(post)
        await self.session.commit()
        await self.session.refresh(post)
        return post
    
    async def get_posts(self) -> list[Post] | None:
        statement = select(Post).order_by(desc(Post.posted_at))
        result = await self.session.execute(statement)
        return result.scalars().all()
    
    async def get_user_posts(self, user_id: uuid.UUID) -> list[Post] | None:
            statement = select(Post).where(Post.user_id == user_id).order_by(desc(Post.posted_at))
            result = await self.session.execute(statement)
            return result.scalars().all()