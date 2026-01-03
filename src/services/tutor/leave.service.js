import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const leaveService = {
  getAll: (params) =>
    api.get(API.TUTOR.LEAVE.GET, { params }),

  create: (data) =>
    api.post(API.TUTOR.LEAVE.CREATE, data),

  delete: (id) => 
    api.delete(`${API.TUTOR.LEAVE.DELETE}/${id}`),

};
