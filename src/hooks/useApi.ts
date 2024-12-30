import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "@/hooks/useAuth";

import { useActiveAccount } from "thirdweb/react";
import { jwtDecode } from "jwt-decode";

export const useApi = () => {
  const { token, logout } = useAuth();
  const account = useActiveAccount();
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
    }
  );

  //add interceptor to check if connected wallet is the same as token wallet
  api.interceptors.request.use(async (config) => {
    if (
      token &&
      account &&
      account.address &&
      account.address.toLowerCase() !==
        jwtDecode<{ context: { wallet_address: string } }>(
          token
        )?.context?.wallet_address.toLowerCase()
    ) {
      logout();
      return config;
    } else {
      return config;
    }
  });

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
    }
  );

  return api;
};
