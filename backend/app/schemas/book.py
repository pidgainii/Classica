from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID


class BookBaseDTO(BaseModel):
    # This configuration is set in order to be able to validate SQLAlchemy models into Pydantic models with model_validate function
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID
    title: str
    author: str
    description: Optional[str] = None
    language: Optional[str] = None
    isbn: Optional[str] = None
    cover_url: str