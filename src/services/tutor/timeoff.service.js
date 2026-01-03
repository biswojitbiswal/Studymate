import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const timeoffService = {
  getAll: (params) =>
    api.get(API.TUTOR.TIMEOFF.GET, { params }),

  create: (data) =>
    api.post(API.TUTOR.TIMEOFF.CREATE, data),

  delete: (id) => 
    api.delete(`${API.TUTOR.TIMEOFF.DELETE}/${id}`),

};
