from fastapi import Depends, HTTPException, Request

from .security import get_user_from_access_token

from schemas.user import UserTokenInfoDTO


# Dependency to return current user from JWT token. If no user is logged in, raises Exception
def get_current_user(current_user: UserTokenInfoDTO = Depends(get_user_from_access_token)) -> UserTokenInfoDTO:
    if (current_user is None):
        # TODO: Manage this exception better
        # Special exception for frontend to know that the access token is not valid
        raise HTTPException(status_code=403, detail="Unauthorized")
    return current_user

# Dependency to extract refresh token from HTTP-only cookie
def get_token_from_cookie(request: Request) -> str | None:
    return request.cookies.get("refresh_token")