from pydantic import BaseModel


class RefreshResponseDTO(BaseModel):
    access_token: str