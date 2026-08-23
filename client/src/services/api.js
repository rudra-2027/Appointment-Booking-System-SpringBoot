import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("appointment_console_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const fallback = {
      400: "The API rejected the request. Check the payload and try again.",
      401: "Your session is missing or expired. Sign in again.",
      403: "This account role is not allowed to access that endpoint.",
      404: "The backend endpoint was not found.",
      500: "The server hit an internal error.",
    };

    error.friendlyMessage =
      error.response?.data?.message ||
      (typeof error.response?.data === "string" ? error.response.data : null) ||
      fallback[status] ||
      "Could not reach the Spring Boot API.";

    return Promise.reject(error);
  }
);

export { API_BASE_URL };
