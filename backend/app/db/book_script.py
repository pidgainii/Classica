import csv
import ast
from uuid import uuid4

from .session import AsyncLocalSession
from .models.book import Book

import asyncio


CSV_PATH = "./data/books_1.Best_Books_Ever.csv"

GENRES_ALLOWED = {"Classics", "Classic Literature"}


async def import_books():
    async with AsyncLocalSession() as db:
        try:
            with open(CSV_PATH, "r", encoding="utf-8-sig", newline="") as file:
                reader = csv.DictReader(file)

                books = []

                for row in reader:
                    # Convertir el campo genres (lista en formato string)
                    try:
                        genres = ast.literal_eval(row["genres"])
                    except (ValueError, SyntaxError):
                        continue

                    # Filtrar por género
                    if not GENRES_ALLOWED.intersection(genres):
                        continue

                    title = row["title"].strip()
                    author = row["author"].strip()
                    cover_url = row.get("coverImg", "").strip()

                    # Campos obligatorios
                    if not title or not author or not cover_url:
                        continue

                    book = Book(
                        id=uuid4(),
                        title=title,
                        author=author,
                        description=row.get("description") or None,
                        language=row.get("language") or None,
                        isbn=row.get("isbn") or None,
                        cover_url=cover_url,
                    )

                    books.append(book)

                db.add_all(books)
                await db.commit()

                print(f"Se han insertado {len(books)} libros.")

        except Exception:
            db.rollback()
            raise

        finally:
            await db.close()

    
if __name__ == "__main__":
    asyncio.run(import_books())