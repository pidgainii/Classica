from db.models import Book
from schemas.books import BookBaseDTO

def book_validation(book_db: Book) -> BookBaseDTO:
    genres = []
    for genre in book_db.genres:
        genres.append(genre.title)
        
    return BookBaseDTO(
        id=book_db.id,
        title=book_db.title,
        author=book_db.author,
        description=book_db.description,
        language=book_db.language,
        isbn=book_db.isbn,
        cover_url=book_db.cover_url,
        genres=genres
    )