import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const authService = {
  verifyEmail: (token) =>
    api.post(`${API.VERIFY_EMAIL}/${token}`),

};
