from pydantic import BaseModel
from uuid import UUID

from .books import BookBaseDTO

class ShelfDTO(BaseModel):
    id: UUID
    name: str
    books: list[BookBaseDTO]
    
class NewShelfRequestDTO(BaseModel):
    name: str