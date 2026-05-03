import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const chatService = {
    dmCreate: (data) =>
        api.post(API.CHAT.DM_CREATE, data),

    groupCreate: (data) =>
        api.post(API.CHAT.GROUP_CREATE, data),

    messageCreate: (data) =>
        api.post(API.CHAT.MESSAGE_CREATE, data),

    getMessage: (params) =>
        api.get(API.CHAT.GET_MESSAGE, {params}),

    getConversations: () =>
        api.get(API.CHAT.GET_CONVERSATIONS),

    deleteForme: (id) =>
        api.delete(`${API.CHAT.DELETE_FOR_ME}/${id}/delete-for-me`),

    deleteForEveryone: (id) =>
        api.delete(`${API.CHAT.DELETE_FOR_EVERYONE}/${id}/delete-for-everyone`),

    togglePin: (id) =>
        api.post(`${API.CHAT.TOGGLE_PINNED}/${id}/toggle-pin`),

    toggleMute: (conversationId) =>
        api.post(`${API.CHAT.MUTE_CONVERSATIONS}/${conversationId}/toggle-mute`),
};
