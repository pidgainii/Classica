from enum import Enum


class BookSortingOrder(str, Enum): 
    RANDOM="Random"
    TITLE="Title: Alphabetical"
    RATING_DESC="Rating: High to Low"
    RATING_ASC="Rating: Low to High"