from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FastAPI Docker Example")

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI in Docker!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/items/")
def create_item(item: Item):
    return {"item_name": item.name, "price_with_tax": item.price * 1.1}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
