import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const taskService = {
  getAll: (params) =>
    api.get(API.STUDENT.TASK.GET, { params }),

  getById: (id) =>
    api.get(`${API.STUDENT.TASK.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.STUDENT.TASK.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.STUDENT.TASK.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.STUDENT.TASK.DELETE}/${id}`),

  complete: (id) => 
    api.patch(`${API.STUDENT.TASK.COMPLETE}/${id}`)
};
