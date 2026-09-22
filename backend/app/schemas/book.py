from pydantic import BaseModel, ConfigDict
from uuid import UUID


class BookBaseDTO(BaseModel):
    # This configuration is set in order to be able to validate SQLAlchemy models into Pydantic models with model_validate function
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID
    title: str
    author: str
    description: str
    language: str
    isbn: str
    cover_url: str