import { createBrowserRouter } from "react-router";

import App from "./App";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import BookDetailsPage from "../Pages/BookDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
