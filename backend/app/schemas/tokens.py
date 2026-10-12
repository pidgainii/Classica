from pydantic import BaseModel, EmailStr
from uuid import UUID


class AccessTokenDTO(BaseModel):
    email: EmailStr
    iat: int
    exp: int

class RefreshTokenDTO(BaseModel):
    id: UUID
    user_id: UUID
    iat: int
    exp: int