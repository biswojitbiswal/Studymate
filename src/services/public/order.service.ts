import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const orderService = {
  getCheckoutDetails: (id) =>
    api.get(`${API.GET_CHECKOUT_DETAILS}/${id}`),

  create: (data) =>
    api.post(API.CREATE_ORDER, data),

  verify: (data) => 
    api.post(API.VERIFY_PAYMENT, data),

  getStatus: (orderId) => 
    api.get(`${API.GET_ORDER_STATUS}/${orderId}/status`)
};
