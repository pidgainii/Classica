from sqlalchemy.ext.asyncio import AsyncSession

from crud.user_repository import UserRepository

from schemas.user import UserApiDTO
from schemas.tokens import AccessTokenDTO

from core.errors import UserNotFoundError

class UserService:
    
    async def get_user_information(self, access_token: AccessTokenDTO, session: AsyncSession) -> UserApiDTO:
        user_repository = UserRepository(session)
        
        user = await user_repository.get_by_email(access_token.email)
        
        if not user:
            raise UserNotFoundError()
        
        userAPI = UserApiDTO.model_validate(user)
        
        return userAPI