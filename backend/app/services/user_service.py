from sqlalchemy.ext.asyncio import AsyncSession

from crud.user_repository import UserRepository

from schemas.user import UserTokenInfoDTO, UserApiDTO

class UserService:
    
    async def get_user_information(self, user_token_info: UserTokenInfoDTO, session: AsyncSession) -> UserApiDTO:
        user_repository = UserRepository(session)
        
        user = await user_repository.get_by_id(user_token_info.id)
        
        if not user:
            # TODO: Custom exception
            raise Exception
        
        userAPI = UserApiDTO.model_validate(user)
        
        return userAPI