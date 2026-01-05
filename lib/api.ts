import axios from "axios";
import { API_URL } from "./constants";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Extended-Frontend/1.0",
  },
});

api.interceptors.request.use((config) => {
  // Read from localStorage (persisted by zustand)
  // Structure: { state: { apiKey: "..." } }
  try {
    const storage = localStorage.getItem("trade-auth-storage");
    if (storage) {
      const { state } = JSON.parse(storage);
      if (state?.apiKey) {
        config.headers["X-Api-Key"] = state.apiKey;
      }
    }
  } catch (e) {
    // Ignore parsing errors
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Simple error logging
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
