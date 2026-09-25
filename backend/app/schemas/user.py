from pydantic import BaseModel, ConfigDict
from uuid import UUID


class UserBaseDTO(BaseModel):
    # This configuration is set in order to be able to validate SQLAlchemy models into Pydantic models with model_validate function
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID
    email: str
    first_name: str
    last_name: str