import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const walletService = {
    getAll: (params) =>
        api.get(API.TUTOR.WALLET.GET_ALL, { params }),

    getForTutor: (params) =>
        api.get(API.TUTOR.WALLET.GET_WITHDRAWL_TUTOR, { params }),

    create: (data) =>
        api.post(API.TUTOR.WALLET.CREATE, data),
};
