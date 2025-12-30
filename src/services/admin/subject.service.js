import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const subjectService = {
  getAll: (params) =>
    api.get(API.ADMIN.SUBJECT.GET, { params }),

  getForPublic: () =>
    api.get(API.ADMIN.SUBJECT.GET_FOR_PUBLIC),

  getById: (id) =>
    api.get(`${API.ADMIN.SUBJECT.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.ADMIN.SUBJECT.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.ADMIN.SUBJECT.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.ADMIN.SUBJECT.DELETE}/${id}`),
};
