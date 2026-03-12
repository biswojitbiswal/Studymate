import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const orderService = {
  getMyOrders: (params) =>
    api.get(API.STUDENT.ORDERS.GET_MY_ORDERS, { params }),

//   getById: (id) =>
//     api.get(`${API.STUDENT.TASK.GET_BY_ID}/${id}`),
};
