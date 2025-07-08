# 🚀 Meta Films - Optimization Guide

## 📋 Tổng quan tối ưu

Dự án đã được tối ưu toàn diện về performance, SEO, error handling và caching. Dưới đây là hướng dẫn chi tiết về các tối ưu đã được áp dụng.

## 🔧 Cấu hình môi trường (.env)

### Cấu trúc file .env đã được tối ưu:

```env
# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
NEXT_PUBLIC_SITE_NAME="Meta Films"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_DESCRIPTION="Xem phim online miễn phí chất lượng cao"

# =============================================================================
# API CONFIGURATION
# =============================================================================
NEXT_PUBLIC_API_URL="https://phimapi.com"
NEXT_PUBLIC_TMDB_API_KEY="your_api_key"

# =============================================================================
# PERFORMANCE & CACHING
# =============================================================================
NEXT_PUBLIC_CACHE_TTL="300"
NEXT_PUBLIC_IMAGE_CACHE_TTL="86400"
NEXT_PUBLIC_DEBUG_MODE="false"
```

### Sử dụng biến môi trường:

```typescript
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_CACHE_TTL } from "@/constanst/env";
```

## ⚡ Performance Optimizations

### 1. React Query Configuration

```typescript
// src/libs/react-query.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: NEXT_PUBLIC_CACHE_TTL * 1000,
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
```

### 2. Axios Optimizations

```typescript
// src/libs/axios.ts
const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "User-Agent": "Meta-Films/1.0",
  },
  decompress: true,
});
```

### 3. Image Optimization (next.config.ts)

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "img.phimapi.com",
      pathname: "/**",
    },
  ],
  formats: ["image/webp", "image/avif"],
  minimumCacheTTL: 86400,
},
```

## 🎯 SEO Optimizations

### 1. Metadata Generation

```typescript
// src/libs/metadata.ts
export function generateMovieMetadata(movie: MovieType): Metadata {
  return {
    title: `${movie.name} (${movie.year})`,
    description: movie.content?.substring(0, 160) + "...",
    openGraph: {
      type: "video.movie",
      images: [movie.poster_url],
    },
  };
}
```

### 2. Structured Data

```typescript
export function generateMovieStructuredData(movie: MovieType) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.name,
    image: movie.poster_url,
    genre: movie.category?.map(cat => cat.name),
  };
}
```

## 🛡️ Error Handling

### 1. Custom Error Classes

```typescript
// src/libs/error-handler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public readonly type: ErrorType,
    public readonly statusCode: number
  ) {
    super(message);
  }
}
```

### 2. Error Handler Usage

```typescript
import { errorHandler, handleApiError } from "@/libs/error-handler";

try {
  const data = await api.get("/movies");
} catch (error) {
  const appError = handleApiError(error, { context: "fetchMovies" });
  // Handle error appropriately
}
```

## 📊 Performance Monitoring

### 1. Performance Monitor

```typescript
// src/libs/performance.ts
import { performanceMonitor } from "@/libs/performance";

// Measure function execution
const result = performanceMonitor.measureFunction(() => {
  return expensiveOperation();
}, "expensiveOperation");

// Get Core Web Vitals
const vitals = await performanceMonitor.getCoreWebVitals();
```

### 2. Debug Tools (Development)

Trong development mode, các debug tools được thêm vào `window`:

```javascript
// Browser console
window.reactQueryCache.stats(); // React Query stats
window.performanceMonitor.getCoreWebVitals(); // Performance metrics
window.errorHandler.stats(); // Error statistics
```

## 🔄 Caching Strategies

### 1. API Caching

```typescript
// Cached request with TTL
const data = await cachedRequest(
  "/movies/popular",
  300000, // 5 minutes TTL
  () => api.get("/movies/popular")
);
```

### 2. Query Key Factories

```typescript
export const queryKeys = {
  movies: {
    all: ["movies"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.movies.all, "list", filters],
    detail: (id: string) => [...queryKeys.movies.all, "detail", id],
  },
};
```

## 🎨 UI Optimizations

### 1. Custom Select Components

```typescript
// Optimized select with themes
<CustomSelect
  value={selectedGenre}
  onChange={setSelectedGenre}
  options={genres}
  theme="genre"
  icon="🎭"
/>
```

### 2. CSS Optimizations

- CSS-in-JS với styled-jsx cho component-specific styles
- Tailwind CSS cho utility classes
- Custom CSS cho complex animations

## 📱 Mobile Optimizations

### 1. Responsive Images

```typescript
// next.config.ts
deviceSizes: [640, 750, 828, 1080, 1200, 1920],
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
```

### 2. Touch Optimizations

- Minimum touch target size: 44px
- Optimized scroll behavior
- Reduced motion for accessibility

## 🔒 Security Optimizations

### 1. Security Headers

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "origin-when-cross-origin" },
      ],
    },
  ];
}
```

### 2. Content Security Policy

```typescript
images: {
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

## 📈 Monitoring & Analytics

### 1. Performance Metrics

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### 2. Error Tracking

- Automatic error logging
- Error categorization
- Context preservation
- Stack trace capture

## 🚀 Deployment Optimizations

### 1. Build Optimizations

```typescript
// next.config.ts
experimental: {
  optimizeCss: true,
  optimizePackageImports: ["lucide-react"],
},
```

### 2. Bundle Analysis

```bash
npm run build
npm run analyze # If bundle analyzer is configured
```

## 📝 Best Practices

### 1. Code Organization

- Separate concerns (API, UI, Business Logic)
- Consistent naming conventions
- Type safety with TypeScript
- Proper error boundaries

### 2. Performance

- Lazy loading for routes and components
- Image optimization with Next.js Image
- Proper caching strategies
- Minimize bundle size

### 3. SEO

- Proper meta tags for all pages
- Structured data for rich snippets
- Sitemap generation
- Robot.txt optimization

## 🔧 Development Tools

### 1. Debug Mode

Set `NEXT_PUBLIC_DEBUG_MODE="true"` để enable:

- Detailed console logging
- Performance monitoring
- Error tracking
- Cache statistics

### 2. Environment Variables

Copy `.env.example` to `.env` và cập nhật các giá trị cần thiết.

## 📚 Additional Resources

- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [React Query Best Practices](https://react-query.tanstack.com/guides/best-practices)
- [Web Vitals](https://web.dev/vitals/)
- [SEO Best Practices](https://developers.google.com/search/docs/beginner/seo-starter-guide)

---

**Lưu ý**: Tất cả các tối ưu này đã được áp dụng và test trong dự án. Để có hiệu suất tốt nhất, hãy đảm bảo cấu hình đúng các biến môi trường và follow các best practices được nêu trên.
