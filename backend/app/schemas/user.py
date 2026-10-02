from pydantic import BaseModel, ConfigDict, EmailStr
from uuid import UUID


class UserBaseDTO(BaseModel):
    # This configuration is set in order to be able to validate SQLAlchemy models into Pydantic models with model_validate function
    model_config = ConfigDict(from_attributes=True)
    email: EmailStr

# Info available inside access token
class UserTokenInfoDTO(UserBaseDTO):
    id: UUID

# Info sent to frontend about user
class UserApiDTO(UserBaseDTO):
    first_name: str
    last_name: str

# All user's info
class UserDatabaseDTO(UserBaseDTO):
    id: UUID
    first_name: str
    last_name: str
    password_hash: str
    # TODO: Add favourites maybe?

# Model with register info about user
class UserRegisterDTO(UserBaseDTO):
    first_name: str
    last_name: str
    password: str
    
# Model with login info about user
class UserLoginDTO(UserBaseDTO):
    password: str