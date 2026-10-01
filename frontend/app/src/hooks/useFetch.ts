import { useState } from "react";

interface UseFetchProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

const useFetch = ({ url, method }: UseFetchProps) => {
  const [loading, setLoading] = useState<boolean>(false);
};
