from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession

from services.authentication_service import AuthenticationService
from services.user_service import UserService

from db.session import get_session

from schemas.user import UserRegisterDTO, UserLoginDTO

from utils.utils import decode_refresh_token_from_cookie, decode_access_token_from_bearer

from core.config import REFRESH_TOKEN_EXPIRE_DAYS, APP_ENV

router = APIRouter()

@router.post("/login")
async def login(response: Response, user_login: UserLoginDTO, session: AsyncSession = Depends(get_session)):
    service = AuthenticationService()
    tokens = await service.login(user_login, session)

    response.set_cookie(
        key="refresh_token",
        value=tokens.get("refresh_token"),
        httponly=True,
        secure=(APP_ENV != "local"),
        samesite="lax",
        max_age=60 * 60 * 24 * int(REFRESH_TOKEN_EXPIRE_DAYS),
    )

    return {"access_token": tokens.get("access_token")}

@router.post("/logout")
async def logout(response: Response):

    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=(APP_ENV != "local"),
        samesite="lax"
    )


@router.post("/register")
async def register(user_register: UserRegisterDTO, session: AsyncSession = Depends(get_session)):
    service = AuthenticationService()
    return await service.register(user_register, session)

@router.get("/refresh")
async def refresh(refresh_token = Depends(decode_refresh_token_from_cookie), session: AsyncSession = Depends(get_session)):
    service = AuthenticationService()
    return await service.refresh(refresh_token, session)

@router.get("/me")
async def current_user(access_token = Depends(decode_access_token_from_bearer), session: AsyncSession = Depends(get_session)):
    service = UserService()
    return await service.get_user_information(access_token, session)