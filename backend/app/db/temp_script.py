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
                row = next(reader)
                row = next(reader)
                
                
                # Convertir el campo genres (lista en formato string)
                genres = ast.literal_eval(row["genres"])
                
                
                statement = select(Genre.title).where(
                    Genre.title.in_(genres)
                )
                result = await db.execute(statement)
                existing_genres = list(result.scalars().all())
                
                non_repeated_genres = list(set(genres) ^ set(existing_genres))

                print(f"\n\n\nAll genres:\n{genres}\n\n\n", flush=True)
                print(f"\n\n\nRepeated genres:\n{existing_genres}\n\n\n", flush=True)
                print(f"\n\n\nNon repeated genres:\n{non_repeated_genres}\n\n\n", flush=True)
                
                genres_db = []
                for genre in non_repeated_genres:
                    genre_db = Genre(
                        id=uuid4(),
                        title=genre,
                    )
                    genres_db.append(genre_db)
                
                
                db.add_all(genres_db)
                await db.commit()

                print(f"Se han insertado {len(genres_db)} generos.")

                
                
                
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
                )

        except Exception:
            await db.rollback()
            raise

        finally:
            await db.close()

    
if __name__ == "__main__":
    asyncio.run(import_books())