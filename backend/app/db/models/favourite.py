from sqlalchemy import Table, ForeignKey, Column

from ..base import Base


# note for a Core table, we use the sqlalchemy.Column construct,
# not sqlalchemy.orm.mapped_column
user_favourite_books = Table(
    "favourite",
    Base.metadata,
    Column("user_id", ForeignKey("user.id"), primary_key=True),
    Column("book_id", ForeignKey("book.id")),
)