import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const resourcesService = {
  getAll: (classId, params) =>
    api.get(`${API.TUTOR.RESOURCES.GET}/${classId}`, { params }),

  create: (data) =>
    api.post(API.TUTOR.RESOURCES.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.TUTOR.RESOURCES.UPDATE}/${id}`, data),

  delete: (id) => 
    api.delete(`${API.TUTOR.RESOURCES.DELETE}/${id}`),

  getForStudent: (params) => 
    api.get(`${API.TUTOR.RESOURCES.GET_FOR_STUDENT}`, {params})
};
