import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const getToken = () => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const login = useCallback(
    (token: string) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("token", token);
      }
      router.push("/");
    },
    [router],
  );

  const logout = useCallback(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("token");
    }
    window.location.replace("/sign-in");
  }, []);

  return {
    token: getToken(),
    login,
    logout,
  };
};
