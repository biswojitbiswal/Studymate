import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const classService = {
  getAll: (params) =>
    api.get(API.TUTOR.CLASSES.GET, { params }),

  getById: (id) =>
    api.get(`${API.TUTOR.CLASSES.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.TUTOR.CLASSES.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.TUTOR.CLASSES.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.TUTOR.CLASSES.DELETE}/${id}`),

  publish: (id) => 
    api.patch(`${API.TUTOR.CLASSES.PUBLISH}/${id}/publish`),

  archive: (id) => 
    api.patch(`${API.TUTOR.CLASSES.PUBLISH}/${id}/archive`)
};
