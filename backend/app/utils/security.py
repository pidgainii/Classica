import bcrypt
from datetime import datetime, timezone, timedelta
from jose import jwt
import uuid

from core.config import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS, HASHING_SECRET_KEY, HASHING_ALGORITHM

def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


# This JWT token will be stored in frontend memory (state)
def create_access_token(user_id: str, email: str) -> str:
    now = datetime.now(timezone.utc)
    expires = now + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))

    payload = {
        "user_id": str(user_id),
        "email": email,
        "iat": int(now.timestamp()),
        "exp": int(expires.timestamp()),
    }

    return jwt.encode(payload, HASHING_SECRET_KEY, algorithm=HASHING_ALGORITHM)

# This JWT token will be stored in http only cookie
def create_refresh_token(user_id: str) -> str:
    now = datetime.now(timezone.utc)
    expires = now + timedelta(days=int(REFRESH_TOKEN_EXPIRE_DAYS))

    payload = {
        "id": str(uuid.uuid4()),
        "user_id": str(user_id),
        "iat": int(now.timestamp()),
        "exp": int(expires.timestamp()),
    }

    return jwt.encode(payload, HASHING_SECRET_KEY, algorithm=HASHING_ALGORITHM)