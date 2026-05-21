import api from "./api";

export const alertApi = {
  // GET ALL ALERTS
  getAll: async () => {
    const response = await api.get("/alerts");
    return response.data;
  },
};