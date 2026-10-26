from pydantic import BaseModel
from uuid import UUID

class PostDTO(BaseModel):
    id: UUID
    title: str
    content: str
    image_url: str

class NewPostRequestDTO(BaseModel):
    title: str
    content: str
    image_url: str
    book_id: UUID