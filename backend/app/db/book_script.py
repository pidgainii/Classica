import csv
import ast
from uuid import uuid4
from sqlalchemy import select

from .session import AsyncLocalSession
from .models import Book, Genre

import asyncio


CSV_PATH = "./data/books_1.Best_Books_Ever.csv"

GENRES_ALLOWED = {"Classics", "Classic Literature"}


async def import_books():
    async with AsyncLocalSession() as db:
        try:
            with open(CSV_PATH, "r", encoding="utf-8-sig", newline="") as file:
                reader = csv.DictReader(file)

                books_db = []
                genres_count = 0

                for row in reader:
                    try:
                        book_genres_titles = ast.literal_eval(row["genres"])
                    except (ValueError, SyntaxError):
                        continue

                    # Selecting only books with "Classics" and "Classic Literature" genres
                    if not GENRES_ALLOWED.intersection(book_genres_titles):
                        continue
                    # Erasing the "Classics" and "Classic Literature" genres (they are in all books we select)
                    book_genres_titles = list(set(book_genres_titles) ^ set(GENRES_ALLOWED))

                    title = row["title"].strip()
                    author = row["author"].strip()
                    cover_url = row.get("coverImg", "").strip()
                    

                    # Compulsary fields
                    if not title or not author or not cover_url:
                        continue
                
                    
                    # Selecting Genres that are already in the DB
                    statement = select(Genre).where(
                        Genre.title.in_(book_genres_titles)
                    )
                    result = await db.execute(statement)
                    existing_genres_db = list(result.scalars().all())
                    
                    # Extracting titles of repeated Genres
                    existing_genres_titles = []
                    for existing_genre_db in existing_genres_db:
                        existing_genres_titles.append(existing_genre_db.title)
                    
                    # Extracting the NEW Genres (we need to create new Genre objects)
                    non_repeated_genres_titles = list(set(book_genres_titles) ^ set(existing_genres_titles))
                    
                    # Calculating how many Genre objects we have
                    genre_count += len(non_repeated_genres_titles)
    
                    # Creating NEW Genre objects
                    new_genres_db = []
                    for genre in non_repeated_genres_titles:
                        genre_db = Genre(
                            id=uuid4(),
                            title=genre,
                        )
                        new_genres_db.append(genre_db)
                    db.add_all(new_genres_db)
                    await db.commit()
                    
                    # All book Genre objects: existing ones and new ones
                    book_genres_db = existing_genres_db+new_genres_db
                    
                    # Creating Book object
                    book = Book(
                        id=uuid4(),
                        title=title,
                        author=author,
                        description=row.get("description") or None,
                        language=row.get("language") or None,
                        isbn=row.get("isbn") or None,
                        cover_url=cover_url,
                        genres=book_genres_db
                    )

                    books_db.append(book)

                db.add_all(books_db)
                await db.commit()

                print(f"\n\n\n*************************************************\n\n\n")
                print(f"\n\n\n************BOOK INSERTION STATISTICS*************")
                print(f"\n\n\n*************************************************\n\n\n")

        except Exception:
            await db.rollback()
            raise

        finally:
            await db.close()

    
if __name__ == "__main__":
    asyncio.run(import_books())