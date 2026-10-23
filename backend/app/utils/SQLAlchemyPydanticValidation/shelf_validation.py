from db.models import Shelf
from schemas.shelf import ShelfDTO

from .book_validation import book_validation

def shelf_validation(shelf_db: Shelf) -> ShelfDTO:
    books = []
    for book_db in shelf_db.books:
        books.append(book_validation(book_db))
        
    return ShelfDTO(
        id=shelf_db.id,
        name=shelf_db.name,
        books=books
    )