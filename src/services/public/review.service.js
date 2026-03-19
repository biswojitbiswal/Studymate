import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const reviewService = {
  create: (data) =>
    api.post(API.REVIEW.CREATE, data),

  statusUpdate: (id, data) => 
    api.patch(`${API.REVIEW.STATUS_UPDATE}/${id}/status`, data),

  getByStudent: (classId) => 
    api.get(`${API.REVIEW.GET_BY_STUDENT}/${classId}`),

  getAll: (params) => 
    api.get(API.REVIEW.GET_ALL, {params}),

  getBrowse: (params) =>
    api.get(API.REVIEW.GET_BROWSE, {params}),
};
