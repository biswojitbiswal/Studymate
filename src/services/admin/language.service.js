import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const languageService = {
  getAll: (params) =>
    api.get(API.ADMIN.LANGUAGE.GET, { params }),

  getById: (id) =>
    api.get(`${API.ADMIN.LANGUAGE.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.ADMIN.LANGUAGE.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.ADMIN.LANGUAGE.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.ADMIN.LANGUAGE.DELETE}/${id}`),
};
