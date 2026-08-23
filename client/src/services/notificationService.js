import { api } from "./api";

export const notificationService = {
  list: () => api.get("/notification"),
  registerToken: (token) => api.post("/notification/register", null, { params: { token } }),
  markRead: (id) => api.put(`/notification/${id}/read`),
};
