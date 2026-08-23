import { api } from "./api";

export const appointmentService = {
  listProviders: () => api.get("/providers"),
  book: (payload) => api.post("/appointment/book", payload),
  getUserAppointments: () => api.get("/user/appointments"),
  complete: (id) => api.put(`/user/appointments/${id}/complete`),
  getProviderAppointments: () => api.get("/provider/appointments"),
  createAvailability: (payload) => api.post("/provider/appointments", payload),
  confirm: (id) => api.put(`/provider/appointments/${id}/confirm`),
  reject: (id) => api.put(`/provider/appointments/${id}/reject`),
};
