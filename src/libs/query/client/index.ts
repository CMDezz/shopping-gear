// src/libs/query/client/index.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false, // Don't retry mutations by default
      onError: (error: any) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// Query key factories for better organization
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
    user: (id: string) => [...queryKeys.auth.all, 'user', id] as const,
  },
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },
  cart: {
    all: ['cart'] as const,
    items: () => [...queryKeys.cart.all, 'items'] as const,
  },
} as const;

// Utility functions for query invalidation
export const invalidateQueries = {
  auth: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.all }),
  profile: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() }),
  products: () => queryClient.invalidateQueries({ queryKey: queryKeys.products.all }),
  orders: () => queryClient.invalidateQueries({ queryKey: queryKeys.orders.all }),
  cart: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart.all }),
};

// Prefetch utilities
export const prefetchQueries = {
  profile: async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.auth.profile(),
      queryFn: async () => {
        // Import here to avoid circular dependencies
        const { userApi } = await import('@/libs/api');
        return userApi.getProfile();
      },
    });
  },
  products: async (page = 1, limit = 10) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.products.list({ page, limit }),
      queryFn: async () => {
        const { productApi } = await import('@/libs/api');
        return productApi.getProducts(page, limit);
      },
    });
  },
};