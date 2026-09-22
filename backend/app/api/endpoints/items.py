from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from services.book_service import BookService

from db.session import get_session

from schemas.book import BookBaseDTO

router = APIRouter()

@router.get("/ten-books", response_model=list[BookBaseDTO])
async def get_ten_books(session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_ten_books(session)
