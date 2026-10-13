from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from services.book_service import BookService

from db.session import get_session

from schemas.books import BookBaseDTO, BooksSearchFiltersDTO, BooksResponseDTO

router = APIRouter()

@router.post("/books", response_model=BooksResponseDTO)
async def get_books(books_search_filters: BooksSearchFiltersDTO, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_books(books_search_filters, session)

@router.get("/book/{id}", response_model=BookBaseDTO)
async def get_book(id: str, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_book(id, session)