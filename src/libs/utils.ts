import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type ApiResponse<Data> = {
  count: number;
  next: string;
  previous: string;
  results: Data;
  statusCode?: number;
};
export const customFetch = async <T>(
  endpoint: string,
  method: string = "GET",
  data: Record<string, any> = {},
  cache: boolean = false,
  headerOptions: Record<string, any> = {},
  request: Record<string, any> = {},
  tagName: string = "all"
): Promise<T> => {
  try {
    const isFormData = headerOptions["isForm"];

    // Create default headers with language and location
    const customHeaders: Record<string, string> = {
      Accept: "application/json",
      ...headerOptions,
    };

    if (!isFormData) {
      customHeaders["Content-Type"] = "application/json";
    }

    // Create request options
    const requestOptions: RequestInit & { body?: string | BodyInit | null } = {
      method,
      ...request,
      ...(method === "POST" ? {} : { headers: customHeaders }),
    };

    if (!cache) {
      requestOptions.cache = "no-store";
    } else {
      requestOptions.next = { tags: [tagName] };
    }

    if (method === "POST") {
      requestOptions.body = isFormData
        ? (data as BodyInit)
        : JSON.stringify(data);

      if (!isFormData) {
        requestOptions.headers = {
          ...requestOptions.headers,
          "Content-Type": "application/json",
        };
      }
    }
    // Construct query parameters
    const queryParams = new URLSearchParams({});

    const isAbsoluteUrl = endpoint.startsWith("http");
    const base = isAbsoluteUrl
      ? endpoint
      : `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
    const cleanBase = base.replace(/\/+$/, "");

    let url = `${cleanBase}&${queryParams.toString()}`;
    // Construct the full URL
    url =
      method === "POST"
        ? endpoint.startsWith("http")
          ? endpoint
          : `${base}/`
        : endpoint.startsWith("http")
        ? endpoint
        : `${base}`;
    console.log("customFetch URL:", url);

    const response = await fetch(url, requestOptions);

    // Handle HTTP status
    if (response.status === 429) {
      return 'Too many requests' as unknown as T;
    }

    const res = await response.json();

    // res.statusCode = response.status;

    try {
      return res ? res : await response.json();
    } catch (error) {
      return res;
    }
  } catch (error) {
    return 'An error occurred' as unknown as T;
  }
};
