import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const couponService = {
  getAll: (params) =>
    api.get(API.ADMIN.COUPON.GET, { params }),

  getForCheckout: (params) =>
    api.get(API.ADMIN.COUPON.GET_COUPON, { params }),

  getById: (id) =>
    api.get(`${API.ADMIN.COUPON.GET_BY_ID}/${id}`),

  create: (data) =>
    api.post(API.ADMIN.COUPON.CREATE, data),

  update: (id, data) =>
    api.patch(`${API.ADMIN.COUPON.UPDATE}/${id}`, data),

  remove: (id) =>
    api.delete(`${API.ADMIN.COUPON.DELETE}/${id}`),
};
