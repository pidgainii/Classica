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

                row = next(reader)
                
                
                # Convertir el campo genres (lista en formato string)
                book_genres_titles = ast.literal_eval(row["genres"])
                
                
                statement = select(Genre).where(
                    Genre.title.in_(book_genres_titles)
                )
                result = await db.execute(statement)
                existing_genres_db = list(result.scalars().all())
                existing_genres_titles = []
                for existing_genre_db in existing_genres_db:
                    existing_genres_titles.append(existing_genre_db.title)
                
                non_repeated_genres_titles = list(set(book_genres_titles) ^ set(existing_genres_titles))



                new_genres_db = []
                for genre in non_repeated_genres_titles:
                    genre_db = Genre(
                        id=uuid4(),
                        title=genre,
                    )
                    new_genres_db.append(genre_db)
                
                
                db.add_all(new_genres_db)
                await db.commit()
                
                book_genres_db = existing_genres_db+new_genres_db
                
                for genre_db in book_genres_db:
                    await db.refresh(genre_db)
                    print(f"\nGenre after refresh: {genre_db.id}\n", flush=True)

                
                
                
                title = row["title"].strip()
                author = row["author"].strip()
                cover_url = row.get("coverImg", "").strip()
                
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
                
                db.add(book)
                await db.commit()

        except Exception:
            await db.rollback()
            raise

        finally:
            await db.close()

    
if __name__ == "__main__":
    asyncio.run(import_books())