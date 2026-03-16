import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const adminOrderService = {
  getOrders: (params) =>
    api.get(API.ADMIN.ORDER.GET_ALL, { params }),

  getById: (id) =>
    api.get(`${API.ADMIN.ORDER.GET_BY_ID}/${id}`),
};
