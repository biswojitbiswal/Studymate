import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const assignmentsService = {
    getAll: (classId, params) =>
        api.get(`${API.TUTOR.ASSIGNMENTS.GET}/${classId}`, { params }),

    create: (data) =>
        api.post(API.TUTOR.ASSIGNMENTS.CREATE, data),

    get: (id) =>
        api.get(`${API.TUTOR.ASSIGNMENTS.GET_BY_ID}/${id}`),

    update: (id, data) =>
        api.patch(`${API.TUTOR.ASSIGNMENTS.UPDATE}/${id}`, data),

    updateStatus: (id, data) =>
        api.patch(`${API.TUTOR.ASSIGNMENTS.UPDATE_STATUS}/${id}/status`, data),

    delete: (id) =>
        api.delete(`${API.TUTOR.ASSIGNMENTS.DELETE}/${id}`),

    getForStudent: (params) =>
        api.get(`${API.TUTOR.ASSIGNMENTS.GET_FOR_STUDENT}`, { params })
};
