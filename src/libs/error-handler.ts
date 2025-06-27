// src/libs/error-handler.ts
import { NEXT_PUBLIC_DEBUG_MODE } from "@/constanst/env";

// Error types
export enum ErrorType {
  NETWORK = "NETWORK",
  API = "API", 
  VALIDATION = "VALIDATION",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  CLIENT = "CLIENT",
  UNKNOWN = "UNKNOWN",
}

// Custom error class
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message);
    
    this.name = this.constructor.name;
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();
    this.context = context;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error factory functions
export const createNetworkError = (message: string, context?: Record<string, any>) =>
  new AppError(message, ErrorType.NETWORK, 0, true, context);

export const createApiError = (message: string, statusCode: number, context?: Record<string, any>) =>
  new AppError(message, ErrorType.API, statusCode, true, context);

export const createValidationError = (message: string, context?: Record<string, any>) =>
  new AppError(message, ErrorType.VALIDATION, 400, true, context);

export const createAuthError = (message: string, context?: Record<string, any>) =>
  new AppError(message, ErrorType.AUTHENTICATION, 401, true, context);

export const createNotFoundError = (message: string, context?: Record<string, any>) =>
  new AppError(message, ErrorType.NOT_FOUND, 404, true, context);

export const createServerError = (message: string, context?: Record<string, any>) =>
  new AppError(message, ErrorType.SERVER, 500, true, context);

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: AppError[] = [];
  private maxQueueSize = 100;

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Handle different types of errors
  public handle(error: Error | AppError, context?: Record<string, any>): AppError {
    let appError: AppError;

    if (error instanceof AppError) {
      appError = error;
    } else {
      // Convert regular errors to AppError
      appError = this.convertToAppError(error, context);
    }

    // Log the error
    this.logError(appError);

    // Add to error queue for monitoring
    this.addToQueue(appError);

    return appError;
  }

  private convertToAppError(error: Error, context?: Record<string, any>): AppError {
    // Check if it's an axios error
    if (error.name === "AxiosError" || "response" in error) {
      const axiosError = error as any;
      const status = axiosError.response?.status || 0;
      const message = axiosError.response?.data?.message || axiosError.message;
      
      if (status >= 400 && status < 500) {
        return createApiError(message, status, { ...context, originalError: error });
      } else if (status >= 500) {
        return createServerError(message, { ...context, originalError: error });
      } else {
        return createNetworkError(message, { ...context, originalError: error });
      }
    }

    // Check for network errors
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return createNetworkError(error.message, { ...context, originalError: error });
    }

    // Default to unknown error
    return new AppError(
      error.message || "An unknown error occurred",
      ErrorType.UNKNOWN,
      500,
      false,
      { ...context, originalError: error }
    );
  }

  private logError(error: AppError): void {
    const logData = {
      message: error.message,
      type: error.type,
      statusCode: error.statusCode,
      timestamp: error.timestamp,
      stack: error.stack,
      context: error.context,
    };

    if (NEXT_PUBLIC_DEBUG_MODE) {
      console.group(`🚨 ${error.type} Error [${error.statusCode}]`);
      console.error("Message:", error.message);
      console.error("Type:", error.type);
      console.error("Status:", error.statusCode);
      console.error("Timestamp:", error.timestamp.toISOString());
      if (error.context) {
        console.error("Context:", error.context);
      }
      if (error.stack) {
        console.error("Stack:", error.stack);
      }
      console.groupEnd();
    } else {
      // In production, log less verbose
      console.error(`[${error.type}] ${error.message}`, {
        statusCode: error.statusCode,
        timestamp: error.timestamp,
      });
    }

    // Send to external logging service in production
    if (typeof window !== "undefined" && !NEXT_PUBLIC_DEBUG_MODE) {
      this.sendToLoggingService(logData);
    }
  }

  private addToQueue(error: AppError): void {
    this.errorQueue.push(error);
    
    // Keep queue size manageable
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }
  }

  private sendToLoggingService(logData: any): void {
    // Implement external logging service integration
    // Example: Sentry, LogRocket, etc.
    try {
      // Example implementation:
      // Sentry.captureException(logData);
      console.log("Would send to logging service:", logData);
    } catch (err) {
      console.error("Failed to send error to logging service:", err);
    }
  }

  // Get error statistics
  public getErrorStats(): {
    total: number;
    byType: Record<ErrorType, number>;
    recent: AppError[];
  } {
    const byType = this.errorQueue.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {} as Record<ErrorType, number>);

    return {
      total: this.errorQueue.length,
      byType,
      recent: this.errorQueue.slice(-10), // Last 10 errors
    };
  }

  // Clear error queue
  public clearQueue(): void {
    this.errorQueue = [];
  }
}

// Singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Utility functions for common error scenarios
export const handleApiError = (error: any, context?: Record<string, any>): AppError => {
  return errorHandler.handle(error, context);
};

export const handleAsyncError = async <T>(
  asyncFn: () => Promise<T>,
  context?: Record<string, any>
): Promise<T | null> => {
  try {
    return await asyncFn();
  } catch (error) {
    errorHandler.handle(error as Error, context);
    return null;
  }
};

// React error boundary helper
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: AppError }>
) => {
  return class ErrorBoundaryWrapper extends React.Component<
    P,
    { hasError: boolean; error?: AppError }
  > {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): { hasError: boolean; error: AppError } {
      const appError = errorHandler.handle(error);
      return { hasError: true, error: appError };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      errorHandler.handle(error, { errorInfo });
    }

    render() {
      if (this.state.hasError && this.state.error) {
        if (fallback) {
          const FallbackComponent = fallback;
          return <FallbackComponent error={this.state.error} />;
        }
        
        return (
          <div className="error-boundary">
            <h2>Something went wrong</h2>
            <p>{this.state.error.message}</p>
            {NEXT_PUBLIC_DEBUG_MODE && (
              <details>
                <summary>Error details</summary>
                <pre>{this.state.error.stack}</pre>
              </details>
            )}
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};

// Global error handler for unhandled promises
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    errorHandler.handle(new Error(event.reason), { type: "unhandledrejection" });
  });

  window.addEventListener("error", (event) => {
    errorHandler.handle(event.error, { type: "globalError" });
  });

  // Add to window for debugging
  if (NEXT_PUBLIC_DEBUG_MODE) {
    (window as any).errorHandler = {
      handler: errorHandler,
      stats: () => errorHandler.getErrorStats(),
      clear: () => errorHandler.clearQueue(),
    };
  }
}

export default errorHandler;
