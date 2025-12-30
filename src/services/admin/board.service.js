import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const boardService = {
  getAll: (params) =>
    api.get(API.ADMIN.BOARD.GET, { params }),

  getForPublic: () =>
    api.get(API.ADMIN.BOARD.GET_FOR_PUBLIC),

  getById: (id) =>
    api.get(`${API.ADMIN.BOARD.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.ADMIN.BOARD.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.ADMIN.BOARD.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.ADMIN.BOARD.DELETE}/${id}`),
};
