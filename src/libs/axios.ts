// src/libs/axios.ts
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SHOW_API_LOGS } from "@/constanst/env";
import axios, { AxiosError, AxiosResponse } from "axios";

// Create axios instance with optimized configuration
const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "User-Agent": "Meta-Films/1.0",
  },
  // Enable compression
  decompress: true,
});

// Request interceptor for logging and request modification
api.interceptors.request.use(
  (config) => {
    // Add timestamp for cache busting if needed
    if (config.params) {
      config.params._t = Date.now();
    } else {
      config.params = { _t: Date.now() };
    }

    // Log requests in development
    if (NEXT_PUBLIC_SHOW_API_LOGS) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (NEXT_PUBLIC_SHOW_API_LOGS) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // Enhanced error handling
    const errorMessage = error.response?.data || error.message;
    const status = error.response?.status;
    const url = error.config?.url;

    // Log errors with more context
    console.error(`❌ API Error [${status}]: ${error.config?.method?.toUpperCase()} ${url}`, {
      message: errorMessage,
      status,
      headers: error.response?.headers,
    });

    // Handle specific error cases
    switch (status) {
      case 429:
        console.warn("⚠️ Rate limit exceeded. Please try again later.");
        break;
      case 500:
        console.error("🔥 Server error. Please try again later.");
        break;
      case 404:
        console.warn("🔍 Resource not found.");
        break;
      case 403:
        console.warn("🚫 Access forbidden.");
        break;
      case 401:
        console.warn("🔐 Unauthorized access.");
        break;
      default:
        if (error.code === "ECONNABORTED") {
          console.error("⏱️ Request timeout. Please check your connection.");
        } else if (error.code === "ERR_NETWORK") {
          console.error("🌐 Network error. Please check your internet connection.");
        }
    }

    return Promise.reject(error);
  }
);

// Helper function for retrying failed requests
export const retryRequest = async (
  requestFn: () => Promise<any>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<any> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      console.warn(`🔄 Retrying request (${i + 1}/${maxRetries}) after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

// Helper function for cached requests
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

export const cachedRequest = async (
  url: string,
  ttl: number = 300000, // 5 minutes default
  requestFn?: () => Promise<any>
): Promise<any> => {
  const now = Date.now();
  const cached = cache.get(url);

  // Return cached data if still valid
  if (cached && (now - cached.timestamp) < cached.ttl) {
    if (NEXT_PUBLIC_SHOW_API_LOGS) {
      console.log(`💾 Cache hit for: ${url}`);
    }
    return cached.data;
  }

  // Make request if no cache or expired
  try {
    const response = requestFn ? await requestFn() : await api.get(url);
    const data = response.data || response;

    // Cache the response
    cache.set(url, {
      data,
      timestamp: now,
      ttl,
    });

    if (NEXT_PUBLIC_SHOW_API_LOGS) {
      console.log(`💾 Cached response for: ${url}`);
    }

    return data;
  } catch (error) {
    // Return stale cache if available during errors
    if (cached) {
      console.warn(`⚠️ Using stale cache for: ${url}`);
      return cached.data;
    }
    throw error;
  }
};

// Clear cache function
export const clearCache = (pattern?: string) => {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

export default api;
