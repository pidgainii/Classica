from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from services.book_service import BookService

from db.session import get_session

from schemas.books import BookBaseDTO, BooksRequestDTO, BooksResponseDTO

router = APIRouter()

@router.get("/books", response_model=BooksResponseDTO)
async def get_books(page: int = 1, perPage: int = 30, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_books(page, perPage, session)

@router.get("/book/{id}", response_model=BookBaseDTO)
async def get_book(id: str, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_book(id, session)