// src/libs/performance.ts
import { NEXT_PUBLIC_DEBUG_MODE } from "@/constanst/env";

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  private constructor() {
    if (typeof window !== "undefined" && NEXT_PUBLIC_DEBUG_MODE) {
      this.initializeObservers();
    }
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers() {
    // Observe navigation timing
    if ("PerformanceObserver" in window) {
      try {
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === "navigation") {
              const navEntry = entry as PerformanceNavigationTiming;
              this.logNavigationMetrics(navEntry);
            }
          });
        });
        navObserver.observe({ entryTypes: ["navigation"] });
        this.observers.push(navObserver);

        // Observe resource timing
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === "resource") {
              this.logResourceMetrics(entry as PerformanceResourceTiming);
            }
          });
        });
        resourceObserver.observe({ entryTypes: ["resource"] });
        this.observers.push(resourceObserver);

        // Observe largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log("🎯 LCP:", lastEntry.startTime.toFixed(2) + "ms");
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.push(lcpObserver);

        // Observe first input delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const eventEntry = entry as any; // PerformanceEventTiming
            if (eventEntry.processingStart && eventEntry.startTime) {
              console.log("⚡ FID:", (eventEntry.processingStart - eventEntry.startTime).toFixed(2) + "ms");
            }
          });
        });
        fidObserver.observe({ entryTypes: ["first-input"] });
        this.observers.push(fidObserver);

      } catch (error) {
        console.warn("Performance observers not supported:", error);
      }
    }
  }

  private logNavigationMetrics(entry: PerformanceNavigationTiming) {
    const metrics = {
      "DNS Lookup": entry.domainLookupEnd - entry.domainLookupStart,
      "TCP Connection": entry.connectEnd - entry.connectStart,
      "TLS Handshake": entry.secureConnectionStart ? entry.connectEnd - entry.secureConnectionStart : 0,
      "Request": entry.responseStart - entry.requestStart,
      "Response": entry.responseEnd - entry.responseStart,
      "DOM Processing": entry.domComplete - entry.domContentLoadedEventStart,
      "Load Complete": entry.loadEventEnd - entry.loadEventStart,
      "Total": entry.loadEventEnd - entry.fetchStart,
    };

    console.group("🚀 Navigation Performance");
    Object.entries(metrics).forEach(([key, value]) => {
      if (value > 0) {
        console.log(`${key}: ${value.toFixed(2)}ms`);
      }
    });
    console.groupEnd();
  }

  private logResourceMetrics(entry: PerformanceResourceTiming) {
    // Only log slow resources (>1000ms) or failed resources
    const duration = entry.responseEnd - entry.startTime;
    if (duration > 1000 || entry.transferSize === 0) {
      console.warn(`🐌 Slow resource: ${entry.name} (${duration.toFixed(2)}ms)`);
    }
  }

  // Manual timing utilities
  public startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }

  public endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (startTime === undefined) {
      console.warn(`No start time found for: ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(label);

    if (NEXT_PUBLIC_DEBUG_MODE) {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  // Measure function execution time
  public measureFunction<T>(
    fn: () => T,
    label: string
  ): T {
    this.startTiming(label);
    const result = fn();
    this.endTiming(label);
    return result;
  }

  // Measure async function execution time
  public async measureAsyncFunction<T>(
    fn: () => Promise<T>,
    label: string
  ): Promise<T> {
    this.startTiming(label);
    const result = await fn();
    this.endTiming(label);
    return result;
  }

  // Get Core Web Vitals
  public getCoreWebVitals(): Promise<{
    lcp?: number;
    fid?: number;
    cls?: number;
  }> {
    return new Promise((resolve) => {
      const vitals: any = {};
      let resolveCount = 0;
      const totalVitals = 3;

      const checkResolve = () => {
        resolveCount++;
        if (resolveCount >= totalVitals) {
          resolve(vitals);
        }
      };

      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.lcp = lastEntry.startTime;
        checkResolve();
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // FID
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const eventEntry = entry as any; // PerformanceEventTiming
          if (eventEntry.processingStart && eventEntry.startTime) {
            vitals.fid = eventEntry.processingStart - eventEntry.startTime;
          }
        });
        checkResolve();
      }).observe({ entryTypes: ["first-input"] });

      // CLS (simplified)
      new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        vitals.cls = clsValue;
        checkResolve();
      }).observe({ entryTypes: ["layout-shift"] });

      // Timeout after 10 seconds
      setTimeout(() => resolve(vitals), 10000);
    });
  }

  // Memory usage monitoring
  public getMemoryUsage(): any {
    if (typeof window !== "undefined" && "memory" in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  // Cleanup observers
  public cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Utility functions
export const measureTime = (label: string) => {
  return {
    start: () => performanceMonitor.startTiming(label),
    end: () => performanceMonitor.endTiming(label),
  };
};

export const withPerformanceLogging = <T extends any[], R>(
  fn: (...args: T) => R,
  label: string
) => {
  return (...args: T): R => {
    return performanceMonitor.measureFunction(() => fn(...args), label);
  };
};

export const withAsyncPerformanceLogging = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  label: string
) => {
  return async (...args: T): Promise<R> => {
    return performanceMonitor.measureAsyncFunction(() => fn(...args), label);
  };
};

// React hook for performance monitoring
export const usePerformanceMonitoring = () => {
  const startTiming = (label: string) => performanceMonitor.startTiming(label);
  const endTiming = (label: string) => performanceMonitor.endTiming(label);
  const measureFunction = <T>(fn: () => T, label: string) => 
    performanceMonitor.measureFunction(fn, label);

  return {
    startTiming,
    endTiming,
    measureFunction,
    getCoreWebVitals: () => performanceMonitor.getCoreWebVitals(),
    getMemoryUsage: () => performanceMonitor.getMemoryUsage(),
  };
};

// Initialize performance monitoring
if (typeof window !== "undefined" && NEXT_PUBLIC_DEBUG_MODE) {
  console.log("🔧 Performance monitoring enabled");
  
  // Add to window for debugging
  (window as any).performanceMonitor = performanceMonitor;
}
