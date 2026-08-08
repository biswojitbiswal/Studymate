import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const publicTutorService = {
  browse: (params) => api.get(API.BROWSE_TUTORS, { params }),
};
