import { AuthProvider } from "../Contexts/AuthContext";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
