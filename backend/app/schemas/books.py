from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class BooksRequestDTO(BaseModel):
    page: int = Field(default=1)
    perPage: int = Field(default=20)