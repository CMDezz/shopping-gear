// src/lib/features/auth/hooks/auth.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, userApi } from "../api/auth.api";
import { queryKeys, invalidateQueries } from "@lib/infrastructure/query";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@lib/shared/types";
import { AxiosError } from "axios";

// Login mutation
export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate and refetch profile
        invalidateQueries.profile();
      }
    },
    onError: (error: AxiosError<unknown>) => {
      console.error("Login error:", error);
    },
  });
}

// Register mutation
export function useRegister() {
  return useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: (data) => {
      if (data.success) {
        invalidateQueries.profile();
      }
    },
    onError: (error: AxiosError<unknown>) => {
      console.error("Register error:", error);
    },
  });
}

// Get user profile
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: () => userApi.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
    },
    onError: (error: AxiosError<unknown>) => {
      console.error("Logout error:", error);
    },
  });
}
