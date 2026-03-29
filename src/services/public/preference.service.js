import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const preferenceService = {
    create: (data) => 
        api.post(API.PREFERENCE.CREATE, data),

    get: () =>
        api.get(API.PREFERENCE.GET),
}