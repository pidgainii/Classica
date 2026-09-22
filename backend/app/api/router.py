from fastapi import APIRouter
from api.endpoints import items

router = APIRouter()

router.include_router(items.router, prefix="/items", tags=["items"])
