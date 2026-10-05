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

## September 21st

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

Next I needed to load the .csv data into the database (in the future I was planning to do a startup service for this, but for now a Python script would be enough). To create this Python script I used ChatGPT. After adjusting some things that were not working correctly, the script worked and I executed it from the backend terminal, and 6864 books were added to the database:

![books_added.png](/media/books_added.png)

---

## September 22nd

### Backend

Now that the books were loaded, it was time to implement the backend logic responsible for extracting the data from the database and transfer it to the frontend.

I decided to start with the upper layer (the API layer). In order to create endpoints properly using in FastAPI, we have to wire up a router to our FastAPI app. To do this, we use `app.include_router(router.router)`. The main router can include "subrouters", or endpoint routers. To do this, we also use `include_router` function. For example: `router.include_router(auth.router, prefix="/auth", tags=["authentication"])`.

After having done the router configuration, I implemented a three layer logic to extract ten random books from the database and return them.

I created a Pydantic model for Book DTO, a book repository, a book service and **_*get_ten_books()*_** API function.

API layer:

```python
@router.get("/ten-books", response_model=list[BookBaseDTO])
async def get_ten_books(session: AsyncSession = Depends(get_session)):
    service = BookService()
    return await service.get_ten_books(session)
```

Service layer:

```python
async def get_ten_books(self, session: AsyncSession) -> list[BookBaseDTO]:
    book_repository = BookRepository(session)
    books_database = await book_repository.get_ten_books()

    if books_database is None:
        # TEMPORARY OF COURSE
        raise Exception

    books_dto = []
    for book in books_database:
        books_dto.append(BookBaseDTO.model_validate(book))
    return books_dto
```

CRUD layer:

```python
async def get_ten_books(self) -> list[Book] | None:
    result = await self.session.execute(
        select(Book)
        .order_by(func.random()).limit(10)
    )
    return result.scalars().all()
```

---

### Frontend

Good, now it is time for the frontend. Although I am familiar with React, I have to re-learn how to build a React application. I first organized the folders inside **_/src_**. Next was to create a base from which I could create new pages and add routes. As I have used React Router before, I decided I would use it in this project too.

After searching different web and video tutorials on the best way to start a React app, I came to the conclusion that everyone has it's own way, and it depends much on the libraries, frameworks and technologies used.

I asked ChatGPT to create me a simple base from which I would start: `main.tsx`, `App.tsx` and `router.tsx`

This is what I learned: The first thing we need to do is to create a root, and the second thing is to render the root. This way we will be able to display React elements inside a browser DOM node. This we will do in `main.tsx`. Then, we will create a router with the **_createBrowserRouter()_** function, and we will pass it inside a RouterProvider component when rendering the root.

## September 23rd

Today I have been learning React basics: Nested components, hooks, custom hooks and more. I have decided to use Axios for data fetching. Maybe later I'll implement also TanStack Query, but for now I'll fetch data manually. I've created an Axios instance and some custom functions for GET, POST, PATCH and DELETE requests. I have also made a custom hook for book fetching. I also organized the router and created the HomePage, where I wanted the list of books to be rendered. Nevertheless, I have had some trouble with the frontend container and had to configure Nginx to serve the React app properly. Also, I have configured the backend to avoid CORS problems.

**The books were being loaded into the screen !!!**

## September 24th

I have started building the frontend. But I have been stuck in order to configure Docker with the React app for it to work correctly.

### Docker frontend container issues:

As I started programming the frontend, I saw that in order to see changes I had to stop the containers, build the frontend container for it to update changes, and start all containers again. This development method was not okay, as it is **very unefficient**. I therefore decided I needed the frontend container to have live update, what is called hot reload. There are plenty of tutorials on how to create development Dockerfiles with hot reload but nothing was working for me.

#### Issue 1

I was getting a problem related to node_modules folder and Rolldown. I found a similar issue here: https://github.com/vitejs/vite/discussions/15532. After investigating for a while, I could not find the solution.

I asked ChatGPT, and I got an answer. I changed from node Alpine to node Slim. The reason is that Rolldown was not finding a binding for Alpine. When changing to Slim, Rolldown changes to another binding and works.

#### Issue 2

After changing to Slim, I fixed that problem, but got another one. The app running in the Docker container was not recognizing Vite. ChatGPT gave me the answer: The **_node_modules_** folder was being installed with the `RUN npm install` command, but it was being overwritten when copying my local **_/frontend/app_** to the container's **_/app_**. The solution was to create an **anonymous volume** for the **_node_modules_** folder inside the **_docker-compose.yml_**. Like this:

```
volumes:
    - ./frontend/app:/app
    - /app/node_modules
```

#### Issue 3

Now the container was startng correctly, but it was not reloading when I made changes. This was related with how Vite detected changes when working Docker. Changes were not being detected. The solution was to activate `usePolling` option inside the **_vite.config.ts_** file.

And finally, IT WAS WORKING !

### Creating first components.

I decided to use HeroUI (https://heroui.com/) library. I installed TailwindCSS and started building my first component: `BookCard`. Here is what I built:

![first_component.png](/media/first_component.png)

## September 25th

### UI design

Although I have coursed a subject called UI/UX, I don't consider myself a good UI designer. Therefore I decided it would be better for me to focus on software engineering concepts and not so deeply in UI design. For that reason, I asked Gemini to create a basic HomePage for me. Gemini gave me all the code in one single page. I decided to separate each component into it's own file. This is what I got:

![UI_initial_page.png](/media/UI_initial_page.png)

Not bad for a start (none of those buttons are functional yet).

### Authentication (Frontend)

I decided it was better to move to some core functionality of the application. Authentication is the first thing to do.

For this project, I will use JWT authentication. I will use access and refresh tokens. I started by thinking how should I implement the authentication logic in the frontend layer: **Authentication Context** is the answer.

In order to implement an Authentication Context in a clean way we need:

- Authentication Context (with **_createContext()_**)
- Authentication Provider
- Custom hook to use the Context

I started by creating something simple:

```typescript
interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (user: UserLogin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

```typescript
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function login(user: UserLogin) {
    // login logic
  }
  async function logout() {
    // logout logic
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

```typescript
export function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuthContext must be used inside AuthProvider!!!");
  }

  const { user, loading, error, login, logout } = authContext;
  return { user, loading, error, login, logout };
}
```

And of course, we need to wrap our app in this custom Authentication Provider in order to be able to use the custom hook:

```typescript
export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
```

Now everything inside App should be able to access the Authentication Context variables and functions.

## September 28th

### Authentication (Backend)

I decided it was time to implement the authentication logic in the backend. First I did the **registration logic**:

- **API layer**: Receives http request and validates data with Pydantic model, calls service function. If everything goes good, returns 200 OK.

- **Service layer**: Checks if a user with that email already exists. If not, hashes password and creates new User object. Calls user repository to add new user to DB.

- **Repository layer (CRUD)**: Adds new user to DB. The id is created on insertion. Therefore the repository refreshes the user and returns it.

\*I did not implement custom exceptions yet. I decided I will do that a bit later.

---

Now, the **login logic** was a bit more complicated:

1. The **API layer** receives http request and validates data with Pydantic. Calls service layer to get two tokens: _access token_ and _refresh token_.

2. The **service layer** calls repository to get the user. If the user exists, it verifies the hashed password with the password provided in the request. If the password is correct, it creates the refresh and access tokens:
   - _Access token_: For now it just contains the id, email, iat timestamp and expire timestamp. I decided access token would expire every 15 minutes.
   - _Refresh token_: Only contains the id, iat timestamp and expire timestamp.

   To create these tokens, we need to encode them with a **hashing key** and a **hashing algorithm**, which I store in my .env file. I am using _python-jose_ library for this.

3. When the **API layer** receives both tokens, it stores the _refresh token_ in an HTTP-only cookie by using `set_cookie()` function. I decided that the refresh token would expire after 30 days. I may implement rotation later. The access token is returned in the http response.

### Authentication (Frontend)

To check if the Authentication Context was working, I created a mock login function. If the email was `pepito@gmail.com` and the password `1234` then it changed the state variable user from undefined to a mock user. It was working correctly.

After this, I decided to investigate and think how would all this token logic work in the frontend. I searched and understood that **the _access token_ should be stored in state memory**. When the page reloads or the token expires, we would use the _refresh token_ to get a new _access token_. In order to implement this logic, it was a good idea to store the _access token_ in the Authentication Context and to use Axios interceptors to implement the refresh logic.

## September 29th

### Authentication (Backend)

Before implementing all the login logic in the frontend, i needed to complete it in the backend. I needed to create the refresh endpoint. So I did it. When calling the `/auth/refresh` endpoint, the backend needs to extract the _refresh token_ from the HTTP-only cookie. In order to do this, I attached a dependency function that would do it. Then, the authentication service is called, and it checks whether the _refresh token_ is valid and extracts user's id. Then, it loads the user from the database in order to create a new _access token_, and returns it.

```python
@router.get("/refresh")
async def refresh(refresh_token = Depends(get_token_from_cookie), session: AsyncSession = Depends(get_session)):
    service = AuthenticationService()
    return await service.refresh(refresh_token, session)
```

Then I also created a **protected endpoint** `/auth/me` that would return current user's info only if a valid access token was passed in the Authentication Header of the HTTP Request. This I also did with a dependency function.

```python
@router.get("/me")
async def current_user(current_user = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    service = UserService()
    return await service.get_user_information(current_user, session)
```

### Authentication (Frontend)

Now it was time to put all together. I created an Axios **request interceptor** that attaches the _access token_ to the Authentication Header of every request. I did it inside a `useLayoutEffect()`, adding the accessToken context variable as a dependency. This way, it would update the interceptor each time the accessToken context variable updated. Doing it inside a `useLayoutEffect()` is useful because it blocks the rendering so that all components use the updated accessToken in their requests.

I also created the **response interceptor**, which checks if the response contains an authentication error. If it does, then saves the original request, calls the `/auth/refresh` endpoint to get a new _access token_. And if a new _access token_ is returned, it udpates the context variable accessToken. Then, it triggers the original request but this time with the new _access token_.

I learnt these concepts and implemented them thanks to: https://www.youtube.com/watch?v=AcYF18oGn6Y.

Now it was time to create a functional login function. It should call the login endpoint with the email and password, and if everything is correct, receive an _access token_ and update context variable accessToken (which would trigger the `useLayoutEffect()` and update the interceptor). The backend sets the **_refresh token_ in the browser's cookies** without the frontend even noticing it.

## September 30th

I have created the login function inside the Authentication Context so that every component could use it. I have also created a `useEffect()` that would load the current user from the backend. **It executes on each reload**, because the user context variable is stored in state memory and disappears on each reload. **This is not very efficient**. Later, I'll have to store some information in **cache**, but for now I'll keep it like this.

For some reason it was not working: The backend was not able to set the refresh token in the browser cookies. After searching for a while, I found the answer: I had to set `withCredentials` to true in the Axios instance (Axios does not send cookies by default).

After a while, the login and refresh logic were working correctly !!!

### Frontend Navigation Logic

Now I decided to create some frontend navigation logic. In the HomePage, I included a user button (👤). If there is no user logged in, this button will send the user to the Login Page. If there IS a logged in user, this button will send the user to the Profile Page. Also, if a logged in user by any chance enters the Login Page writing the URL manually, it automatically redirects him to the HomePage.

I also made the Book Card Components be clickable. When clicking it, it navigates the user to the Book Details Page. The route of this page includes the id of the book as a **route parameter**.

## October 1st

### Refresh endpoint error message

The `localhost:8000/auth/me` endpoint is called on every render (`useEffect()`) by the Authentication Provider to get the current user from the _access token_. It was working fine. But while checking the browser DevTools Console, I noticed something. When reloading the app, two requests were being made to this endpoint with **401 Unauthorized** response.
I started debugging the backend but these specific requests did not even reach the backend. I searched on the Internet and asked ChatGPT, but did not find any real answer. I decided to investigate this issue later.

---

### Backend: Global Exception Handler

It was time to create a scalable error handling system.
To do this, I created an Error class:

```python
class Error(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    def __str__(self):
        return self.message
```

And specific error classes:

```python
class EntityFetchingError(Error):
    def __init__(self, message ="UNABLE TO FETCH ENTITY"):
        super().__init__(message)

class UserNotFoundError(Error):
    def __init__(self, message ="USER NOT FOUND"):
        super().__init__(message)
```

Then I registered an exception handler for each error using `@app.exception_handler()`:

```python
@app.exception_handler(UserNotFoundError)
async def user_not_found_error_handler(request: Request, exc: UserNotFoundError):
    print(f"\n\nUserNotFoundError: {exc}\n\n")
    return JSONResponse(
        status_code=401,
        content={
            "detail": "Unauthorized"
        }
    )
```

---

### Frontend: Fetching

At the moment, my fetching functions looked like this:

```typescript
export const currentUserRequest = async (): Promise<User | Result> => {
  try {
    const { data: result } = await api.get("/auth/me");
    return result;
  } catch (error: any) {
    const result: Result = { success: false };
    return result;
  }
};

export const tenBooksRequest = async (): Promise<Book[] | Result> => {
  try {
    const { data: result } = await api.get("items/ten-books");
    return result;
  } catch (error: any) {
    const result: Result = { success: false };
    return result;
  }
};
```

As the app will continue to grow, more and more fetching functions will be created. And that is **a lot of repeated code**.

## October 2nd

**Therefore, I decided it was a good idea to do a common GET and POST function in order to avoid repeting code**.

### Zod validation

But in order to do do this generic request functions, I needed an **efficient way to validate data**. Therefore, I investigated what is the best way to validate data in Typescript. I found out that Zod what the best library to do this. It gives you to possibility to create Zod Objects, infer Typescript types from them and parse data models in a safe way.

This is the Zod object I created for the Book model:

```typescript
import z from "zod";

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().nullish(),
  language: z.string().nullish(),
  isbn: z.string().nullish(),
  cover_url: z.string().nullish(),
});

export type BookType = z.infer<typeof bookSchema>;
```

After watching examples, reading documentation, watching tutorials and thinking, I managed to create this generic GET function:

```typescript
export const getMethod = async (
  url: string,
  expected_schema: z.ZodObject | z.ZodArray,
): Promise<Response> => {
  try {
    const { data: result } = await api.get(url);

    const zodResult = expected_schema.safeParse(result);

    if (!zodResult.success) {
      const response: Response = {
        success: false,
        message: "Data parsing error",
      };
      return response;
    }

    const response: Response = { success: true, data: zodResult.data };
    return response;
  } catch (error: any) {
    const result: Response = { success: false, message: "API request error" };
    return result;
  }
};
```

Using this function, my API calls now looked like this:

```typescript
export const currentUserRequest = async (): Promise<Response> => {
  return await getMethod("/auth/me", userSchema);
};

export const tenBooksRequest = async (): Promise<Response> => {
  return await getMethod("/items/ten-books", bookSchema.array());
};
```

I did the same with POST function.
