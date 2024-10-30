import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "@/hooks/useAuth";

export const useApi = () => {
  const { token, logout } = useAuth();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (config.url && config.url.includes("/auth/login")) {
        return config;
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (
        error.response?.status === 401 &&
        window.location.pathname !== "/sign-in"
      ) {
        logout();
      }
      return Promise.reject(error);
    },
  );

  return api;
};
