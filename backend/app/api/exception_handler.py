from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from core.errors import *

def register_exception_handlers(app: FastAPI):

    @app.exception_handler(EntityCreationError)
    async def creation_error_handler(request: Request, exc: EntityCreationError):
        print(f"\n\nEntityCreationError: {exc}\n\n")
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal Sever Error"
            }
        )
        
    @app.exception_handler(EntityFetchingError)
    async def fetching_error_handler(request: Request, exc: EntityFetchingError):
        print(f"\n\nEntityFetchingError: {exc}\n\n")
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal Sever Error"
            }
        )
    
    
    
    @app.exception_handler(UserNotFoundError)
    async def user_not_found_error_handler(request: Request, exc: UserNotFoundError):
        print(f"\n\nUserNotFoundError: {exc}\n\n")
        return JSONResponse(
            status_code=401,
            content={
                "detail": "Unauthorized"
            }
        )
        
    @app.exception_handler(IncorrectPasswordError)
    async def incorrect_password_error_handler(request: Request, exc: IncorrectPasswordError):
        print(f"\n\nIncorrectPasswordError: {exc}\n\n")
        return JSONResponse(
            status_code=401,
            content={
                "detail": "Unauthorized"
            }
        )
    
    # We are not going to notify frontend, as it may be dangerous
    # Frontend will just show a user friendly message saying that if account
    # does not exist yet, the user will receive an email
    @app.exception_handler(UserAlreadyExistsError)
    async def user_already_exists_error_handler(request: Request, exc: UserAlreadyExistsError):
        print(f"\n\nUserAlreadyExistsError: {exc}\n\n")
        return JSONResponse(
            status_code=200,
            content={
                "detail": "OK"
            }
        )

    @app.exception_handler(AccessTokenError)
    async def access_token_error_handler(request: Request, exc: AccessTokenError):
        print(f"\n\nAccessTokenError: {exc}\n\n")
        return JSONResponse(
            status_code=401,
            content={
                "detail": "Unauthorized"
            }
        )

    @app.exception_handler(RefreshTokenError)
    async def refresh_token_error_handler(request: Request, exc: RefreshTokenError):
        print(f"\n\nRefreshTokenError: {exc}\n\n")
        return JSONResponse(
            status_code=403,
            content={
                "detail": "Unauthorized"
            }
        )
