import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const studentDashboardService = {
  getStudentAnalytics: (params) =>
    api.get(API.STUDENT.DASHBOARD.ANALYTICS, { params }),

};
