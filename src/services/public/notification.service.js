import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const notificationService = {
    getAll: () =>
        api.get(API.NOTIFICATION.GET_ALL),

    getUnreadCount: () =>
        api.get(API.NOTIFICATION.GET_COUNT),

    markAllAsRead: () =>
        api.patch(API.NOTIFICATION.BULK_MARK_AS_READ),

    markAsRead: (id) =>
        api.patch(`${API.NOTIFICATION.MARK_AS_READ}/${id}/mark-read`),
};
