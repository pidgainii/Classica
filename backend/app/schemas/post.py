from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class PostDTO(BaseModel):
    id: UUID
    title: str
    content: str
    image_url: str
    posted_at: datetime

class NewPostRequestDTO(BaseModel):
    title: str
    content: str
    image_url: str
    book_id: UUID