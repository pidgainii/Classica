from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from services.book_service import BookService
from services.user_service import UserService

from db.session import get_session

from schemas.books import BookBaseDTO, BooksSearchFiltersDTO, BooksResponseDTO

from utils.utils import decode_access_token_from_bearer

router = APIRouter()

@router.post("/books", response_model=BooksResponseDTO)
async def get_books(books_search_filters: BooksSearchFiltersDTO, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_books(books_search_filters, session)

@router.get("/book/{id}", response_model=BookBaseDTO)
async def get_book(id: str, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_book(id, session)

@router.get("/book-favourite/{id}", response_model=bool)
async def is_favourite(id: str, access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = UserService()
    return await service.get_is_book_favourite(access_token, id, session)