import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const wishlistService = {
    toggle: (id) =>
        api.post(`${API.WISHLIST.TOGGLE}/${id}/toggle`),

    getAll: (params) =>
        api.get(API.WISHLIST.GET_ALL, { params })
};
