# Description

Classica is a classical book searching and review website. Classica is an educational project. The goal is not to create a large scale website, but to consolidate software engineering concepts and acquire knowledge on full stack development.

## Technical description

This a container-based system where Frontend, Backend and Database run on independent Docker services and communicate through API REST.

# Key Features

Some of the key features of Classica are:

- Book **Searching**, **Sorting** and **Filtering** by Genre and Language.
- Exploring **Special Categories**.
- **Creating an account** gives users the possibility to save books to **Favourites**, create **Book Shelves** and **upload Posts**.
- **Blog Section** is available, where users can check other user's posts.

# Technological Stack

## Frontend

- React + Typescript
- Vite
- TanStack Query
- Zod validation
- Axios
- HeroUI library

## Backend

- Python FastAPI
- Pydantic
- SQLAlchemy

## Database

- PostgreSQL
- pgAdmin

## Other

- Docker containerization
- Alembic for Database migrations
- Git for version control

# Software Concepts

## Frontend

- Component based architecture.
- Global Authentication Context using React Context.
- Access and Refresh token management with Axios interceptors.
- Route Navigation and Route Protection with React Router.
- Caching queries using TanStack Query.
- Infinite Pagination using TanStack Query.
- Data validation with Zod.

## Backend

- Three layer architecture: API - Service - CRUD.
- Data validation using Pydantic.
- Global Error Handling System.
- Page-Based Pagination (Books and Posts).
- JWT token encoding and decoding.
- Refresh Token setting and retrieval from HTTP-only Cookie.
-

## Database

- Column indexing for efficient search.
- Associate tables for complex relationships.

## Containerization

- Hot reloading for development phase using bind mounts.

# Installation

### 1

```
git clone https://github.com/pidgainii/Classica
```

### 2

Add **.env** file with the variables specified in **.env.example**

### 3

In the route of the project (where **docker-compose.yml** file is)

```
docker compose up --build
```
