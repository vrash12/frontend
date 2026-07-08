import axios from "axios";

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://api.vrmsuliva.online"
).replace(/\/$/, "");

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("portfolio_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getImageUrl(image?: string | null) {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  if (image.startsWith("/static")) {
    return `${API_BASE_URL}${image}`;
  }

  return `${API_BASE_URL}/static/images/${image}`;
}