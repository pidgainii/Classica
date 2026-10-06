import { createBrowserRouter, Navigate } from "react-router";

import App from "./App";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import BookDetailsPage from "../Pages/BookDetailsPage";
import HomeBooksPage from "../Pages/HomeBooksPage";
import HomeBlogPage from "../Pages/HomeBlogPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Navigate to="/books" />,
    children: [
      {
        element: <HomePage />,
        children: [
          { path: "books", element: <HomeBooksPage /> },
          { path: "blog", element: <HomeBlogPage /> },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "book/:id",
        element: <BookDetailsPage />,
      },
    ],
  },
]);
