from fastapi import FastAPI
from pydantic import BaseModel

from api import router

app = FastAPI(title="CLASSICA")

app.include_router(router.router)



@app.get("/health")
def health_check():
    return {"status": "healthy"}


