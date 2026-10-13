from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

from typing import List

from .base import Base


class User(Base):
    __tablename__ = "user"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=True)
    
    favourites: Mapped[List['Book']] = relationship(secondary='users_favourite_books')
    
    
class Book(Base):
    __tablename__ = "book"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # indexing for fast search. No need to be unique
    title: Mapped[str] = mapped_column(String, nullable=False, index=True)
    author: Mapped[str] = mapped_column(String, nullable=False, index=True)
    
    description: Mapped[str] = mapped_column(String, nullable=True)
    language: Mapped[str] = mapped_column(String, nullable=True)
    isbn: Mapped[str] = mapped_column(String, nullable=True)
    
    cover_url: Mapped[str] = mapped_column(String, nullable=False)
    
    genres: Mapped[List['Genre']] = relationship(secondary='books_genres', back_populates="books")
    
    
class Genre(Base):
    __tablename__ = "genre"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    title: Mapped[str] = mapped_column(String, unique=True, nullable=False)

    books: Mapped[List['Book']] = relationship(secondary='books_genres', back_populates="genres")
    
    
    
    
    
    
############################################################################
# Secondary association tables
############################################################################

users_favourite_books = Table(
    "users_favourite_books",
    Base.metadata,
    Column("user_id", ForeignKey("user.id"), primary_key=True),
    Column("book_id", ForeignKey("book.id")),
)

books_genres = Table(
    "books_genres",
    Base.metadata,
    Column("book_id", ForeignKey("book.id"), primary_key=True),
    Column("genre_id", ForeignKey("genre.id"), primary_key=True),
)