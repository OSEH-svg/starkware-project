import axios from "axios";
import { API_URL } from "./constants";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Extended-Frontend/1.0",
    // We will inject X-Api-Key here if needed, or per request
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Simple error logging
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
