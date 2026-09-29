from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession

from services.authentication_service import AuthenticationService

from db.session import get_session

from schemas.user import UserRegisterDTO, UserLoginDTO


from core.config import REFRESH_TOKEN_EXPIRE_DAYS, APP_ENV

router = APIRouter()

@router.post("/login")
async def login(response: Response, user_login: UserLoginDTO, session: AsyncSession = Depends(get_session)):
    service = AuthenticationService()
    tokens = await service.login(user_login, session)

    app_env = APP_ENV

    response.set_cookie(
        key="refresh_token",
        value=tokens.get("refresh_token"),
        httponly=True,
        secure=(app_env != "local"),
        samesite="lax",
        max_age=60 * 60 * 24 * int(REFRESH_TOKEN_EXPIRE_DAYS),
    )

    return {"access_token": tokens.get("access_token")}

@router.post("/register")
async def register(user_register: UserRegisterDTO, session: AsyncSession = Depends(get_session)):
    service = AuthenticationService()
    return await service.register(user_register, session)
