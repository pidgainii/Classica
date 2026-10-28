from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from db.models import Post

from crud.user_repository import UserRepository
from crud.post_repository import PostRepository
from crud.book_repository import BookRepository

from schemas.post import PostDTO, NewPostRequestDTO, PostsResponseDTO
from schemas.tokens import AccessTokenDTO

from core.errors import EntityFetchingError, EntityCreationError, NotAllowedUserError

from utils.SQLAlchemyPydanticValidation.post_validation import post_validation

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
        
        post_db = Post(
            title=new_post_request.title,
            content= new_post_request.content,
            image_url=new_post_request.image_url,
            user_id=user.id,
            user=user,
            book_id=book.id,
            book=book
        )
        
        post_db = await post_repository.create(post_db)
        
        if not post_db:
            raise EntityCreationError("UNABLE TO CREATE NEW POST")
        
        post_dto = post_validation(post_db)
        
        return post_dto
   
    async def get_paginated_posts(self, page: int, perPage: int, session: AsyncSession) -> PostsResponseDTO:
        post_repository = PostRepository(session)
        
        paginated_posts_db = await post_repository.get_paginated_posts(page, perPage)
        number_of_posts = await post_repository.get_number_of_posts()
        
        if paginated_posts_db is None:
            raise EntityFetchingError("UNABLE TO LOAD POSTS")
        
        if number_of_posts is None:
            raise EntityFetchingError("UNABLE TO LOAD NUMBER OF POSTS")
        
        next_page = page+1 if page*perPage < number_of_posts else None        
        
        paginated_posts_dto = []
        for post in paginated_posts_db:
            paginated_posts_dto.append(post_validation(post))
        
        paginated_response = PostsResponseDTO(current_page=page, next_page=next_page, posts=paginated_posts_dto)
        return paginated_response
    
    async def get_user_post(self, access_token: AccessTokenDTO, post_id: uuid.UUID, session: AsyncSession) -> list[PostDTO]:
        # We only want the user who posted the post to access this data
        user_repository = UserRepository(session)
        post_repository = PostRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        post_db = await post_repository.get_by_id(post_id)
        
        if post_db is None:
            raise EntityFetchingError("UNABLE TO LOAD POST")
        
        if user.id != post_db.user.id:
            raise NotAllowedUserError("USER NOT ALLOWED TO ACCESS POST INFORMATION")
        
        return post_validation(post_db) 
    
    async def get_user_posts(self, access_token: AccessTokenDTO, session: AsyncSession) -> list[PostDTO]:
        post_repository = PostRepository(session)
        user_repository = UserRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
                
        if not user:
            raise EntityFetchingError(f"UNABLE TO LOAD USER {access_token.email}")
        
        posts_db = await post_repository.get_user_posts(user.id)
        
        if posts_db is None:
            raise EntityFetchingError("UNABLE TO LOAD POSTS")
        
        posts_dto = []
        for post_db in posts_db:
            posts_dto.append(post_validation(post_db))
        
        return posts_dto
        