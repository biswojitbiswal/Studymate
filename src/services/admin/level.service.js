import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const levelService = {
  getAll: (params) =>
    api.get(API.ADMIN.LEVEL.GET, { params }),

  getForPublic: () =>
    api.get(API.ADMIN.LEVEL.GET_FOR_PUBLIC),

  getById: (id) =>
    api.get(`${API.ADMIN.LEVEL.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.ADMIN.LEVEL.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.ADMIN.LEVEL.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.ADMIN.LEVEL.DELETE}/${id}`),
};
