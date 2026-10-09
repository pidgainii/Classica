from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import bcrypt
from jose import jwt
from datetime import datetime, timezone

from schemas.tokens import AccessTokenDTO, RefreshTokenDTO

from core.config import HASHING_SECRET_KEY, HASHING_ALGORITHM
from core.errors import AccessTokenError, RefreshTokenError

security = HTTPBearer()

def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# This JWT token will be stored in frontend memory (state)
def create_access_token(token: AccessTokenDTO) -> str:
    payload = {
        "user_id": str(token.user_id),
        "email": token.email,
        "iat": token.iat,
        "exp": token.exp,
    }
    return jwt.encode(payload, HASHING_SECRET_KEY, algorithm=HASHING_ALGORITHM)

# This JWT token will be stored in http only cookie
def create_refresh_token(token: RefreshTokenDTO) -> str:
    payload = {
        "id": str(token.id),
        "user_id": str(token.user_id),
        "iat": token.iat,
        "exp": token.exp,
    }
    return jwt.encode(payload, HASHING_SECRET_KEY, algorithm=HASHING_ALGORITHM)

# This function gets user info from access token from Bearer and decodes it. Throws custom error if expired.
def decode_access_token_from_bearer(credentials: HTTPAuthorizationCredentials = Depends(security)) -> AccessTokenDTO | None:
    try:
        token = credentials.credentials
        payload = jwt.decode(token, HASHING_SECRET_KEY, algorithms=[HASHING_ALGORITHM])





        # TODO: CHECK IF THIS WORKS
        #######################################################
        now = datetime.now(timezone.utc)
        exp=payload.get("exp")
        if (now > exp):
            raise AccessTokenError("Access Token Expired")
        #######################################################



        

        return AccessTokenDTO(
            user_id=payload.get("user_id"),
            email=payload.get("email"),
            iat=payload.get("iat"),
            exp=payload.get("exp"),
        )
    except:
        return None

# This function gets encoded token from HTTP cookie and decodes it. Throws custom error if expired.
def decode_refresh_token_from_cookie(request: Request) -> RefreshTokenDTO | None:
    try:
        token = request.cookies.get("refresh_token")
        payload = jwt.decode(token, HASHING_SECRET_KEY, algorithms=[HASHING_ALGORITHM])
        
        
        
        
        
        # TODO: CHECK IF THIS WORKS
        #######################################################
        now = datetime.now(timezone.utc)
        exp=payload.get("exp")
        if (now > exp):
            raise RefreshTokenError("Refresh Token Expired")
        #######################################################
        
        
        
        
        
        
        
        return RefreshTokenDTO(
            id=payload.get("id"),
            user_id=payload.get("user_id"),
            iat=payload.get("iat"),
            exp=payload.get("exp"),
        )
    except:
        return None