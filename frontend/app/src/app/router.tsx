import { createBrowserRouter } from "react-router";

import App from "./App";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";

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
    ],
  },
]);
