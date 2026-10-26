from sqlalchemy.ext.asyncio import AsyncSession

from db.models import Post

from crud.user_repository import UserRepository
from crud.post_repository import PostRepository
from crud.book_repository import BookRepository

from schemas.post import PostDTO, NewPostRequestDTO
from schemas.tokens import AccessTokenDTO


from core.errors import EntityFetchingError, EntityCreationError


class PostService:
    async def create_post(self, access_token: AccessTokenDTO, new_post_request: NewPostRequestDTO, session: AsyncSession) -> PostDTO:
        user_repository = UserRepository(session)
        book_repository = BookRepository(session)
        post_repository = PostRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        book = await book_repository.get_by_id(new_post_request.book_id)
        
        if not book:
            raise EntityFetchingError(f"UNABLE TO LOAD BOOK")
        
        post = Post(
            title=new_post_request.title,
            content= new_post_request.content,
            image_url=new_post_request.image_url,
            user_id=user.id,
            user=user,
            book_id=book.id,
            book=book
        )
        
        post = await post_repository.create(post)
        
        if not post:
            raise EntityCreationError("UNABLE TO CREATE NEW POST")
        
        post_dto = PostDTO(
            id=post.id,
            title=post.title,
            content=post.content,
            image_url=post.image_url,
            posted_at=post.posted_at
        )
        
        return post_dto
   
    async def get_posts(self, session: AsyncSession) -> list[PostDTO]:
        post_repository = PostRepository(session)
        
        posts = await post_repository.get_posts()
        
        if posts is None:
            raise EntityFetchingError("UNABLE TO LOAD POSTS")
        
        return posts
    
    # TODO
    async def get_user_posts(self, access_token: AccessTokenDTO, session: AsyncSession) -> list[PostDTO]:
        post_repository = PostRepository(session)
        user_repository = UserRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
                
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        posts = await post_repository.get_user_posts(user.id)
        
        if posts is None:
            raise EntityFetchingError("UNABLE TO LOAD POSTS")
        
        return posts
        