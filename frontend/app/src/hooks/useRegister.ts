import { useEffect, useState } from "react";
import { register } from "../Services/api/userService";

export default function useRegister() {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const registerFunction = async () => {
      try {
        await register();
        setSuccess(true);
        setIsLoading(false);
      } catch {
        setError(true);
        setSuccess(false);
        setIsLoading(false);
      } finally {
      }
    };

    registerFunction();
  }, []);

  return { success, isLoading, error };
}
