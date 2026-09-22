import { createBrowserRouter } from "react-router";

import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /*
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    */
    ],
  },
]);
