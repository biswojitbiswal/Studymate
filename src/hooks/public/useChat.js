import { chatService } from "@/services/public/chat.service";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const updateMessagePages = (old, updater) => {
  if (!old) return old;
  return {
    ...old,
    pages: old.pages.map((page, index) => updater(page, index)),
  };
};

export const useCreateDM = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => chatService.dmCreate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["conversations"] }),
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await chatService.groupCreate(data)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["conversations"] }),
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await chatService.messageCreate(data)).data.data,
    onSuccess: (newMessage, variables) => {
      queryClient.setQueryData(["messages", variables.conversationId], (old) =>
        updateMessagePages(old, (page, index) => {
          if (index !== 0) return page;
          if (page.messages.some((message) => message.id === newMessage.id)) return page;
          return { ...page, messages: [...page.messages, newMessage] };
        }),
      );

      queryClient.setQueryData(["conversations"], (old) => {
        if (!old?.data) return old;
        const conversations = old.data.map((conversation) =>
          conversation.id === variables.conversationId
            ? { ...conversation, lastMessage: newMessage, updatedAt: newMessage.createdAt }
            : conversation,
        );
        conversations.sort((a, b) =>
          a.id === variables.conversationId
            ? -1
            : b.id === variables.conversationId
              ? 1
              : 0,
        );
        return { ...old, data: conversations };
      });
    },
  });
};

export const useInfiniteMessages = (conversationId) =>
  useInfiniteQuery({
    queryKey: ["messages", conversationId],
    queryFn: async ({ pageParam }) => {
      const response = await chatService.getMessage({
        conversationId,
        cursor: pageParam,
        limit: 20,
      });
      return response.data.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: Boolean(conversationId),
    initialPageParam: undefined,
    refetchOnWindowFocus: false,
  });

export const useConversations = () =>
  useQuery({
    queryKey: ["conversations"],
    queryFn: async () => (await chatService.getConversations()).data,
    staleTime: 30_000,
  });

export const useDeleteForMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ messageId }) =>
      (await chatService.deleteForme(messageId)).data.data,
    onSuccess: ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) =>
        updateMessagePages(old, (page) => ({
          ...page,
          messages: page.messages.filter((message) => message.id !== messageId),
          conversation:
            page.conversation.pinnedMessageId === messageId
              ? { ...page.conversation, pinnedMessageId: null, pinnedMessage: null }
              : page.conversation,
        })),
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

export const useDeleteForEveryone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ messageId }) =>
      (await chatService.deleteForEveryone(messageId)).data.data,
    onSuccess: ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) =>
        updateMessagePages(old, (page) => ({
          ...page,
          messages: page.messages.map((message) =>
            message.id === messageId
              ? { ...message, content: "This message was deleted", isDeleted: true, replyTo: null }
              : message,
          ),
          conversation:
            page.conversation.pinnedMessageId === messageId
              ? { ...page.conversation, pinnedMessageId: null, pinnedMessage: null }
              : page.conversation,
        })),
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

export const useTogglePin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ messageId }) =>
      (await chatService.togglePin(messageId)).data.data,
    onSuccess: ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;
        const pinnedMessage = old.pages
          .flatMap((page) => page.messages)
          .find((message) => message.id === messageId);
        return updateMessagePages(old, (page) => ({
          ...page,
          conversation: {
            ...page.conversation,
            pinnedMessageId: messageId || null,
            pinnedMessage: pinnedMessage || null,
          },
        }));
      });
    },
  });
};

export const useMarkConversationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ conversationId }) =>
      (await chatService.markConversationRead(conversationId)).data.data,
    onSuccess: ({ conversationId }) => {
      queryClient.setQueryData(["conversations"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, unreadCount: 0 }
              : conversation,
          ),
        };
      });
    },
  });
};
