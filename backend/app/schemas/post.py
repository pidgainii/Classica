from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime
from .user import UserApiDTO
from .books import BookBaseDTO

class PostDTO(BaseModel):
    id: UUID
    title: str
    content: str
    image_url: str
    posted_at: datetime
    
    user: UserApiDTO
    book: BookBaseDTO

class NewPostRequestDTO(BaseModel):
    title: str
    content: str
    image_url: str
    book_id: UUID
    
class PostsResponseDTO(BaseModel):
    current_page: int
    next_page: Optional[int]
    posts: list[PostDTO]