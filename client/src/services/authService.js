import { api } from "./api";

export const authService = {
  login: (payload) => api.post("/auth/login", payload),
  registerUser: (payload) => api.post("/auth/register/user", payload),
  registerProvider: (payload) => api.post("/auth/register/provider", payload),
};
