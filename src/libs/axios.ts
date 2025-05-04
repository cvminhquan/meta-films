// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-US",
    include_adult: false,
  },
});

// Optional: Thêm interceptor xử lý lỗi hoặc token
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
