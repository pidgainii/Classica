from pydantic import BaseModel, ConfigDict, EmailStr
from uuid import UUID


class UserBaseDTO(BaseModel):
    # This configuration is set in order to be able to validate SQLAlchemy models into Pydantic models with model_validate function
    model_config = ConfigDict(from_attributes=True)
    email: EmailStr
    
class UserDatabaseDTO(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    password_hash: str
    # TODO: Add favourites maybe?

class UserRegisterDTO(UserBaseDTO):
    first_name: str
    last_name: str
    password: str
    
class UserLoginDTO(UserBaseDTO):
    password: str