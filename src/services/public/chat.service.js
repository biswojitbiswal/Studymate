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
};
