import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const availibilityService = {
  getAll: (params) =>
    api.get(API.TUTOR.AVAILABILITY.GET, { params }),

  create: (data) =>
    api.post(API.TUTOR.AVAILABILITY.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.TUTOR.AVAILABILITY.UPDATE}/${id}`, data),

  delete: (id) => 
    api.delete(`${API.TUTOR.AVAILABILITY.DELETE}/${id}`),

  toggle: (id) => 
    api.patch(`${API.TUTOR.AVAILABILITY.TOGGLE}/${id}`)
};
