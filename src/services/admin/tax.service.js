import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const taxService = {
  getAll: (params) =>
    api.get(API.ADMIN.TAX.GET, { params }),

  getById: (id) =>
    api.get(`${API.ADMIN.TAX.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.ADMIN.TAX.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.ADMIN.TAX.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.ADMIN.TAX.DELETE}/${id}`),
};
