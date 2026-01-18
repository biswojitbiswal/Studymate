import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const tutorService = {
    tutorApply: (data) =>
        api.post(API.TUTOR.TUTOR_APPLY, { data }),

    tutorApproved: (id) =>
        api.post(`${API.TUTOR.TUTOR_APPROVED}/${id}`),

    getAll: (params) =>
        api.get(API.TUTOR.GET_TUTORS, { params }),

    getById: (id) =>
        api.get(`${API.TUTOR.GET_TUTOR_BY_ID}/${id}`),

    getForMe: () =>
        api.get(API.TUTOR.GET_ME),

    update: (data) =>
        api.patch(`${API.TUTOR.UPDATE_ME}`, data),
};
