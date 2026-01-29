import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const commissionService = {
  getAll: (params) =>
    api.get(API.ADMIN.COMMISSION.GET, { params }),

  getById: (id) =>
    api.get(`${API.ADMIN.COMMISSION.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.ADMIN.COMMISSION.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.ADMIN.COMMISSION.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.ADMIN.COMMISSION.DELETE}/${id}`),
};
