from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from services.book_service import BookService
from services.favourite_service import FavouriteService
from services.shelf_service import ShelfService

from db.session import get_session

from schemas.books import BookBaseDTO, BooksSearchFiltersDTO, BooksResponseDTO
from schemas.shelf import ShelfDTO, NewShelfRequestDTO

from utils.utils import decode_access_token_from_bearer

import uuid

router = APIRouter()

################### BOOKS ###################

@router.post("/books", response_model=BooksResponseDTO)
async def get_books(books_search_filters: BooksSearchFiltersDTO, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_books(books_search_filters, session)

@router.get("/book/{id}", response_model=BookBaseDTO)
async def get_book(id: uuid.UUID, session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_book(id, session)

@router.post("/favourite-books", response_model=BooksResponseDTO)
async def get_favourite_books(books_search_filters: BooksSearchFiltersDTO, access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = FavouriteService()
    return await service.get_favourite_books(access_token, books_search_filters, session)

@router.get("/is-book-favourite/{id}", response_model=bool)
async def is_favourite(id: uuid.UUID, access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = FavouriteService()
    return await service.get_is_book_favourite(access_token, id, session)

@router.post("/book-favourite/{id}", response_model=bool)
async def add_favourite(id: uuid.UUID, access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = FavouriteService()
    return await service.add_book_favourite(access_token, id, session)


################### SHELVES ###################

@router.post("/create-shelf", response_model=ShelfDTO)
async def create_shelf(new_shelf_request: NewShelfRequestDTO, access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = ShelfService()
    return await service.create_shelf(access_token, new_shelf_request, session)

@router.get("/shelves", response_model=list[ShelfDTO])
async def get_shelves(access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = ShelfService()
    return await service.get_shelves(access_token, session)

@router.post("/shelf-books", response_model=BooksResponseDTO)
async def get_shelf_books(books_search_filters: BooksSearchFiltersDTO, access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = ShelfService()
    return await service.get_shelf_books(access_token, books_search_filters, session)


# TODO: Add query params to get shelf name and book id.
@router.get("/is-book-saved", response_model=bool)
async def is_book_saved_in_shelf(access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = FavouriteService()
    return await service.get_is_book_favourite(access_token, id, session)

@router.post("/book-saved", response_model=bool)
async def save_book_to_shelf(access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = FavouriteService()
    return await service.add_book_favourite(access_token, id, session)