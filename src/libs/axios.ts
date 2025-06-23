// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_2,
  headers: {
    "Content-Type": "application/json",
  }
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
