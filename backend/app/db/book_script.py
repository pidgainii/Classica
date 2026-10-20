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
                
                # Keys -> titles. Values -> Genre objects
                genres_db = dict()

                for row in reader:
                    try:
                        book_genres_titles = ast.literal_eval(row["genres"])
                    except (ValueError, SyntaxError):
                        continue

                    # Selecting only books with "Classics" and "Classic Literature" genres
                    if not GENRES_ALLOWED.intersection(book_genres_titles):
                        continue
                    # Erasing the "Classics" and "Classic Literature" genres (they are in all books we select)
                    book_genres_titles = list(set(book_genres_titles) - set(GENRES_ALLOWED))

                    title = row["title"].strip()
                    author = row["author"].strip()
                    cover_url = row.get("coverImg", "").strip()
                    

                    # Compulsary fields
                    if not title or not author or not cover_url:
                        continue
                
                    
                    # Extracting the already existing Genre titles
                    existing_genres_titles = list(set(genres_db.keys()).intersection(set(book_genres_titles)))
                    # We also need the existing Genre objects themselves
                    existing_genres = []
                    for g in existing_genres_titles:
                        existing_genres.append(genres_db[g])
                    
                    
                    # Extracting the NEW Genres titles (we need to create new Genre objects)
                    non_repeated_genres_titles = list(set(book_genres_titles) ^ set(existing_genres_titles))
                    
                    # Creating NEW Genre objects
                    new_genres = []
                    for genre in non_repeated_genres_titles:
                        genre_db = Genre(
                            id=uuid4(),
                            title=genre,
                        )
                        new_genres.append(genre_db)
                        # Adding new Genre to all Genres dict
                        genres_db[genre] = genre_db
                    
                    # All book Genre objects: existing ones and new ones
                    book_genres = existing_genres+new_genres
                    
                    # Creating Book object
                    book = Book(
                        id=uuid4(),
                        title=title,
                        author=author,
                        description=row.get("description") or None,
                        language=row.get("language") or None,
                        isbn=row.get("isbn") or None,
                        cover_url=cover_url,
                        genres=book_genres
                    )

                    books_db.append(book)
                
                db.add_all(genres_db.values())
                db.add_all(books_db)
                await db.commit()

                print(f"\n\n\n*************************************************")
                print(f"************BOOK INSERTION STATISTICS************")
                print(f"*************************************************\n\n\n")
                print(f"\n\n\nBooks added: {len(books_db)}\n")
                print(f"Genres added: {len(genres_db)}\n\n\n")

        except Exception:
            await db.rollback()
            raise

        finally:
            await db.close()

    
if __name__ == "__main__":
    asyncio.run(import_books())