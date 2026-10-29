from db.models import Post
from schemas.post import PostDTO
from schemas.user import UserApiDTO

from .book_validation import book_validation

def post_validation(post_db: Post) -> PostDTO:
    user = UserApiDTO(
        email=post_db.user.email,
        first_name=post_db.user.first_name,
        last_name=post_db.user.last_name)
    book = book_validation(post_db.book)
    
    post = PostDTO(
        id=post_db.id,
        title=post_db.title,
        content=post_db.content,
        image_url=post_db.image_url,
        posted_at=post_db.posted_at,
        user=user,
        book=book,
    )
    
    return post