from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone, timedelta
import uuid

from crud.user_repository import UserRepository

from schemas.user import UserRegisterDTO, UserLoginDTO
from schemas.refresh import RefreshResponseDTO
from schemas.tokens import AccessTokenDTO, RefreshTokenDTO

from db.models.user import User

from core.errors import UserNotFoundError, IncorrectPasswordError, UserAlreadyExistsError, EntityCreationError, EntityFetchingError, RefreshTokenError

from utils.utils import hash_password, verify_password, create_access_token, create_refresh_token

from core.config import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS

class AuthenticationService:
    
    async def login(self, user_login: UserLoginDTO, session: AsyncSession):
        user_repository = UserRepository(session)

        user = await user_repository.get_by_email(user_login.email)
        
        if not user:
            raise UserNotFoundError()
        
        if not verify_password(user_login.password, user.password_hash):
            raise IncorrectPasswordError()
        
        
        # Creating access token:
        now = datetime.now(timezone.utc)
        expires = now + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
        access_token = AccessTokenDTO(
            user_id=user.id,
            email=user.email,
            iat=int(now.timestamp()),
            exp=int(expires.timestamp()),
        )
        encoded_access_token = create_access_token(access_token)
        
        
        # Creating refresh token:
        now = datetime.now(timezone.utc)
        expires = now + timedelta(days=int(REFRESH_TOKEN_EXPIRE_DAYS))
        refresh_token = RefreshTokenDTO(
            id=uuid.uuid4(),
            user_id=user.id,
            iat=int(now.timestamp()),
            exp=int(expires.timestamp()),
        )
        encoded_refresh_token = create_refresh_token(refresh_token)
        
        return {
            'refresh_token': encoded_refresh_token,
            'access_token': encoded_access_token
        }
    
    async def register(self, user_register: UserRegisterDTO, session: AsyncSession):
        user_repository = UserRepository(session)
        
        existing_user = await user_repository.get_by_email(user_register.email)
        
        if existing_user:
            raise UserAlreadyExistsError()
        
        password_hash = hash_password(user_register.password)
        
        user = User(
            email=user_register.email,
            first_name=user_register.first_name,
            last_name=user_register.last_name,
            password_hash=password_hash
        )
        
        user = await user_repository.create(user)
        
        if not user:
            raise EntityCreationError("UNABLE TO CREATE USER")
        
    async def refresh(self, refresh_token: RefreshTokenDTO, session: AsyncSession):
        user_repository = UserRepository(session)
        
        # TODO: Check if token is valid: Expire date etc -> DONE IN DEPENDENCY: STILL HAVE TO CHECK IF WORKS
        
        user = await user_repository.get_by_id(refresh_token.user_id)
        
        if not user:
            raise EntityFetchingError(f"USER WITH ID {refresh_token.user_id} NOT FOUND")
        
        # Creating access token:
        now = datetime.now(timezone.utc)
        expires = now + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
        access_token = AccessTokenDTO(
            user_id=user.id,
            email=user.email,
            iat=int(now.timestamp()),
            exp=int(expires.timestamp()),
        )
        encoded_access_token = create_access_token(access_token)
        
        return RefreshResponseDTO(access_token = encoded_access_token)