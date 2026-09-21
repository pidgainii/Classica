# PROJECT PROGRESS

### In this document, the progress and evolution of this project will be tracked. It will be updated each time the project advances and each time I acquire new knowledge on software development.

---

## September 17th / 18th

During this two first days I have been thinking how to approach this project. I decided to create one single repository with two folders: one for the backend layer and one for the frontend layer.

Then I created a React+Typescript+Vite empty project and managed to run it in both development and production modes. I am using _Serve_ to run the React application. I inmediately created two Dockerfiles (development and production), which are used to create the Docker images. I checked they worked correctly with `docker run` command.

For the backend layer, I created a Python virtual environment, and created a basic **main.py** page. Then I created a simple Dockerfile for the backend and checked it was running correctly inside the container.

After this, I created the **docker-compose.yml** file, creating two services. Frontend runs on port 3000 and backend runs on port 8000. For each service, I created a bind mount for hot reload during development phase.

Finally, I started the containers with `docker compose up` command. Everything was running fine.

After having a functional backend and frontend, the next step was creating the database with some tables and establishing connection with it. To do this, I had to:

- Create a class that inherits from _DeclarativeBase_ class, from which all tables will inherit
- Create an engine
- Create a get_session() function, that will return an Asynchronous Session

Then, I created two new services in the **docker-compose.yml** file: The Postgres database and the pgAdmin service, in order to visualize better the database, without terminal commands.

---

## September 21th

I created the first database model:

```python
class User(Base):

    __tablename__ = "user"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)

    first_name: Mapped[str] = mapped_column(String, nullable=False)

    last_name: Mapped[str] = mapped_column(String, nullable=False)

    password_hash: Mapped[str] = mapped_column(String, nullable=True)
```

The next step was installing Alembic and creating the initial migration to add the `user` table to the database. In order to do this, we have to configure the **env.py** file with the Postgres configuration variables. After having done the configuration, we have to generate the migration. We do it by executing the command `alembic revision --autogenerate -m "Initial migration: adding user table"`.

> **IMPORTANT**: This command has to be ran inside the Docker backend container. I have been stuck for a while trying to run it in my local terminal.

In order to do this, we have to run the backend container with the command `docker compose run backend bash`.

I was still having some trouble with the env.py configuration. I was trying to have asynchronous connections and the alembic command did not want to work. I decided to ask ChatGPT. This is what I learned:

In order for Alembic to work with asynchronous connections, we need to use `async_engine_from_config` and create the migrations with `asyncio`. I had to modify therefore, the `run_migrations_online` function.

But I was still having trouble...

Finally, I found out that it was all about specifying the name of the environment file... 😆

The first alembic migration was created successfully:

![initial_migration.png](/media/initial_migration.png)

And the user table was shown in the pgAdmin tool:

![user_table.png](/media/user_table.png)

---

Now it was time to create some more tables. The most important one is the **book** table, as this is supposed to be a book review webpage. I created this simple model schema:

![initial_database_models.png](/media/initial_database_models.png)

The next thing to do was to create a **SIMPLE PAGE** to **connect database, backend and frontend**. The idea was to load many books into the database from a .csv file (https://zenodo.org/records/4265096), create a multilayer logic in the backend **(repository + service + API endpoint)** and a frontend view that would call the backend endpoint and load the books.

To do this, I started by adding a new table **book** and a relationship **favourite** (Core Table for many-to-many relationship), which for now was not essential, but anyway.

Next I needed to load the .csv data into the database (in the future I was planning to do a startup service for this, but for now a Python script would be enough).
