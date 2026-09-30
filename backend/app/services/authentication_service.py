from sqlalchemy.ext.asyncio import AsyncSession

from crud.user_repository import UserRepository

from schemas.user import UserRegisterDTO, UserLoginDTO
from schemas.refresh import RefreshResponseDTO

from db.models.user import User

from utils.security import hash_password, verify_password, create_access_token, create_refresh_token, get_user_id_from_refresh_token

class AuthenticationService:
    
    async def login(self, user_login: UserLoginDTO, session: AsyncSession):
        user_repository = UserRepository(session)

        user = await user_repository.get_by_email(user_login.email)
        
        if not user:
            # TODO: Custom error
            raise Exception("User not found")
        
        if not verify_password(user_login.password, user.password_hash):
            # TODO: Custom error
            raise Exception("Incorrect password")
            
            
        # Creating refresh token:
        refresh_token = create_refresh_token(user.id)
        
        # Creating access token:
        access_token = create_access_token(user.id, user.email)
        
        return {
            'refresh_token': refresh_token,
            'access_token': access_token
        }
    
    async def register(self, user_register: UserRegisterDTO, session: AsyncSession):
        user_repository = UserRepository(session)
        
        existing_user = await user_repository.get_by_email(user_register.email)
        
        if existing_user:
            # TODO: custom error
            raise Exception("User already exists")
        
        password_hash = hash_password(user_register.password)
        
        user = User(
            email=user_register.email,
            first_name=user_register.first_name,
            last_name=user_register.last_name,
            password_hash=password_hash
        )
        
        user = await user_repository.create(user)
        
        if not user:
            # TODO: custom error
            raise Exception
        
    async def refresh(self, refresh_token: str, session: AsyncSession):
        user_repository = UserRepository(session)
        
        # TODO: Check if token is valid: Expire date etc
        
        user_id = get_user_id_from_refresh_token(refresh_token)
        
        if not user_id:
            # TODO: Custom exception
            raise Exception("Refresh token not valid or not available")
        
        user = await user_repository.get_by_id(user_id)
        
        if not user:
            # TODO: Custom exception
            raise Exception("User does not exist")
        
        access_token = create_access_token(user.id, user.email)
        
        return RefreshResponseDTO(access_token = access_token)