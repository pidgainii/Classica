from sqlalchemy.ext.asyncio import AsyncSession

from crud.user_repository import UserRepository

from schemas.user import UserApiDTO
from schemas.tokens import AccessTokenDTO

from core.errors import UserNotFoundError, EntityFetchingError

import uuid

class UserService:
    
    async def get_user_information(self, access_token: AccessTokenDTO, session: AsyncSession) -> UserApiDTO:
        user_repository = UserRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise UserNotFoundError()
        
        userAPI = UserApiDTO.model_validate(user)
        
        return userAPI
    
    async def get_is_book_favourite(self, access_token: AccessTokenDTO, book_id: uuid.UUID, session: AsyncSession) -> bool:
        user_repository = UserRepository(session)
        is_book_favourite = await user_repository.get_is_book_favourite(access_token.email, book_id)
        if not is_book_favourite:
            raise EntityFetchingError("UNABLE TO CHECK IF BOOK IS FAVOURITE")
        return is_book_favourite
        
        