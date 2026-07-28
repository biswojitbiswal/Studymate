import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const adminDashboardService = {
  getAdminAnalytics: (params) =>
    api.get(API.ADMIN.DASHBOARD.ANALYTICS, { params }),

};
