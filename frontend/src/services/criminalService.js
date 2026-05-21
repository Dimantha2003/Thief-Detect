import api from "./api";

export const criminalApi = {
  getAll: async () => {
    const response = await api.get("/criminals");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/criminals/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post("/criminals", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/criminals/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/criminals/${id}`);
    return response.data;
  },
};