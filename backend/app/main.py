from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from api import router

from api.exception_handler import register_exception_handlers

from services.startup_service import import_books

@asynccontextmanager
async def lifespan(app: FastAPI):
    await import_books()
    yield

app = FastAPI(title="CLASSICA", lifespan=lifespan)

app.include_router(router.router)

register_exception_handlers(app)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# ALLOW FRONTEND TO MAKE REQUESTS
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
