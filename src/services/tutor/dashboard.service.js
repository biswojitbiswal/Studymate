import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const tutorDashboardService = {
  getTutorAnalytics: (params) =>
    api.get(API.TUTOR.DASHBOARD.ANALYTICS, { params }),

};
