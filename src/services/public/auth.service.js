import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const authService = {
  verifyEmail: (token) =>
    api.post(`${API.VERIFY_EMAIL}/${token}`),

  toggleStatus: (id) => 
    api.patch(`${API.TOGGLE_STATUS}/${id}`),

  forgotPassword: (email) =>
    api.post(API.FORGOT_PASSWORD, { email }),

  resetPassword: (token, data) =>
    api.post(`${API.RESET_PASSWORD}?token=${token}`, data),

  changePassword: (data) =>
    api.patch(API.CHANGE_PASSWORD, data),
};
