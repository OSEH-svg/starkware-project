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
    // Dynamically import store to avoid circular deps or init issues
    // Or access localStorage directly if simple
    const storageItem = localStorage.getItem('auth-storage');
    if (storageItem) {
        try {
            const { state } = JSON.parse(storageItem);
            if (state?.token) {
                // Extended likely uses "Bearer" or specialized header
                // We'll try standard Bearer
                config.headers.Authorization = `Bearer ${state.token}`;
                // Also common: X-Api-Key or X-Signature
                config.headers['X-Auth-Token'] = state.token;
            }
        } catch (e) {
            // ignore
        }
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
