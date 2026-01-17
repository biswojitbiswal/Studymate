import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const studentService = {
  getAll: (params) =>
    api.get(API.STUDENT.GET_STUDENTS, { params }),

  getById: (id) =>
    api.get(`${API.STUDENT.GET_STUDENT_BY_ID}/${id}`),

  getForMe: () =>
    api.get(API.STUDENT.GET_ME),

  update: (data) =>
    api.patch(`${API.STUDENT.UPDATE_ME}`, data),
};
