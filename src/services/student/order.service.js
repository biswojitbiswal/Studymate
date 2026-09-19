import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const orderService = {
  getMyOrders: (params) =>
    api.get(API.STUDENT.ORDERS.GET_MY_ORDERS, { params }),

  getById: (id) =>
    api.get(`${API.STUDENT.ORDERS.GET_BY_ID}/${id}`),

  getInvoice: (orderId) =>
    api.get(`${API.STUDENT.ORDERS.INVOICE}/${orderId}`),

  prepareInvoice: (orderId) =>
    api.post(`${API.STUDENT.ORDERS.INVOICE}/${orderId}/prepare`),

  downloadInvoice: (orderId) =>
    api.get(`${API.STUDENT.ORDERS.INVOICE}/${orderId}/download`, {
      responseType: "blob",
    }),
};
