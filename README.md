<div align="center">

# 📜 CLASSICA

Classica is a classical book searching and review website. Classica is an educational project. The goal is not to create a large scale website, but to consolidate software engineering concepts and acquire knowledge on full stack development. \*_All the progress is being written down in `PROJECT_PROGRESS.md` file._

</div>

## 🛠️ Technological Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/HeroUI-000000?style=for-the-badge&logo=nextui&logoColor=white" alt="HeroUI" />
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white" alt="Pydantic" />
  <img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white" alt="SQLAlchemy" />
</p>

### Database

<p>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/pgAdmin-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="pgAdmin" />
</p>

### Other

<p>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Alembic-6C757D?style=for-the-badge&logo=alembic&logoColor=white" alt="Alembic" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
</p>

## ℹ️ Description

This a container-based system where Frontend, Backend and Database run on independent Docker services and communicate through API REST.

## 🖼️ Screenshots

### Books Page:

<p align="center">
  <img src=media/better_homepage.png width="550" height="330">
</p>

### Blog Page:

<p align="center">
  <img src=media/blog_page.png width="550" height="330">
</p>

### My Library:

<p align="center">
  <img src=media/my_library_page.png width="550" height="320">
</p>

### Book Details:

<p align="center">
  <img src=media/book_details_page.png width="550" height="320">
</p>

### Saving Book:

<p align="center">
  <img src=media/save_book_modal.png width="550" height="380">
</p>

## ✨ Key Features

Some of the key features of Classica are:

- Book Searching, Sorting and Filtering by Genre and Language.
- Exploring Special Categories.
- Creating an account gives users the possibility to save books to Favourites, create Book Shelves and upload Posts.
- Blog Section is available, where users can check other user's posts.

## 💡 Software Concepts

### Frontend

- **Component** based architecture.
- Global **Authentication Context** using React Context.
- **Access and Refresh token** management with Axios interceptors.
- Route **Navigation** and Route **Protection** with React Router.
- **Caching** queries using TanStack Query.
- Infinite **Pagination** using TanStack Query.
- **Data validation** with Zod.

### Backend

- Three layer architecture: **API - Service - CRUD**.
- **Data validation** using Pydantic.
- Global **Error Handling** System.
- Page-Based Pagination (Books and Posts).
- **JWT** token encoding and decoding.
- Refresh Token setting and retrieval from **HTTP-only Cookie**.

### Database

- Column **indexing** for efficient search.
- Associate tables for **complex relationships**.

### Containerization

- **Hot reloading** for development phase using bind mounts.
- **API REST** communication between containers.

## ⚙️ Installation

1. Clone the repository

   ```bash
   git clone https://github.com/pidgainii/Classica
   ```

2. Add **.env** file with the variables specified in **.env.example**

3. Build the docker containers. Run this command in the route of the project (where **docker-compose.yml** file is)

   ```bash
   docker compose up --build
   ```

4. Open your browser (`localhost:3000`) and enjoy the project!

## 📬 Contact

Created by [@pidgainii](https://pidgainii.github.io/website/) - feel free to contact me!
