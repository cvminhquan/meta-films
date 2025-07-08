// src/libs/react-query.ts
import { NEXT_PUBLIC_CACHE_TTL } from "@/constanst/env";
import { QueryClient } from "@tanstack/react-query";

// Create optimized QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache time (how long data stays in cache when component unmounts)
      gcTime: 1000 * 60 * 10, // 10 minutes

      // Stale time (how long data is considered fresh)
      staleTime: NEXT_PUBLIC_CACHE_TTL * 1000, // From env variable

      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch configuration
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnReconnect: true,    // Refetch when network reconnects
      refetchOnMount: true,        // Refetch when component mounts

      // Network mode
      networkMode: "online", // Only run queries when online
    },
    mutations: {
      // Retry mutations once
      retry: 1,

      // Network mode for mutations
      networkMode: "online",
    },
  },
});
