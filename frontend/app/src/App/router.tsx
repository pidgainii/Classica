import { createBrowserRouter, Navigate } from "react-router";

import HomePage from "../Pages/main/HomePage";
import LoginPage from "../Pages/main/LoginPage";
import ProfilePage from "../Pages/main/ProfilePage";
import BookDetailsPage from "../Pages/main/BookDetailsPage";
import HomeBooksPage from "../Components/primary/HomeBooksPage";
import HomeBlogPage from "../Components/primary/HomeBlogPage";
import RegisterPage from "../Pages/main/RegisterPage";
import UserRoutes from "../Utils/UserRoutes";
import NoUserRoutes from "../Utils/NoUserRoutes";
import MyProfilePage from "../Pages/secondary/MyProfilePage";
import MyLibraryPage from "../Pages/secondary/MyLibraryPage";
import MyPostsPage from "../Pages/secondary/MyPostsPage";
import SettingsPage from "../Pages/secondary/SettingsPage";
import FavouritesPage from "../Pages/main/FavouritesPage";
import BookShelfPage from "../Pages/main/BookShelfPage";
import CreatePostPage from "../Pages/main/CreatePostPage";

export const router = createBrowserRouter([
  {
    element: <HomePage />,
    children: [
      { path: "books", element: <HomeBooksPage /> },
      { path: "blog", element: <HomeBlogPage /> },
    ],
  },
  {
    element: <UserRoutes />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          { index: true, element: <MyProfilePage /> },
          {
            path: "my-library",
            element: <MyLibraryPage />,
          },
          { path: "my-posts", element: <MyPostsPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
      { path: "favourites", element: <FavouritesPage /> },
      { path: "bookshelf/:name", element: <BookShelfPage /> },
      { path: "newpost/:id", element: <CreatePostPage /> },
    ],
  },
  {
    element: <NoUserRoutes />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "book/:id",
    element: <BookDetailsPage />,
  },
  {
    path: "*",
    element: <Navigate to="/books" replace />,
  },
]);
