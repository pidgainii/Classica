from fastapi import APIRouter
from api.endpoints import items, authentication

router = APIRouter()

router.include_router(items.router, prefix="/items", tags=["items"])
router.include_router(authentication.router, prefix="/auth", tags=["authentication"])
