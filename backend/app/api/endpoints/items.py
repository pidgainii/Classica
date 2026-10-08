from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from services.book_service import BookService

from db.session import get_session

from schemas.book import BookBaseDTO
from schemas.books import BooksRequestDTO

router = APIRouter()

@router.get("/books", response_model=list[BookBaseDTO])
async def get_books(books_request: BooksRequestDTO, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_books(session)

@router.get("/book/{id}", response_model=BookBaseDTO)
async def get_book(id: str, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_book(id, session)