from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, func

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
    
    async def get_by_id(self, id: uuid.UUID) -> Post | None:
        statement = select(Post).where(Post.id == id)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()
    
    async def get_paginated_posts(self, page: int, perPage: int) -> list[Post] | None:
        statement = select(Post).order_by(desc(Post.posted_at)).limit(perPage).offset((page-1)*perPage)
        result = await self.session.execute(statement)
        return result.scalars().all()
    
    async def get_number_of_posts(self) -> int | None:
        result = await self.session.execute(
            select(func.count()).select_from(
                select(Post.id)
                .subquery()
            )
        )
        return result.scalar_one()
        
    async def get_user_posts(self, user_id: uuid.UUID) -> list[Post] | None:
        statement = select(Post).where(Post.user_id == user_id).order_by(desc(Post.posted_at))
        result = await self.session.execute(statement)
        return result.scalars().all()