from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router

app = FastAPI(title="CLASSICA")

app.include_router(router.router)



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
