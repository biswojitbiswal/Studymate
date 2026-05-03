import { chatService } from "@/services/public/chat.service";
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from "@tanstack/react-query";


export const useCreateDM = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await chatService.dmCreate(data);
      return res;
    },
  });
};


export const useCreateGroup = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await chatService.groupCreate(data);
      return res.data;
    },
  });
};


// export const useSendMessage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data) => {
//       const res = await chatService.messageCreate(data);
//       return res.data;
//     },

//     onSuccess: (data, variables) => {
//       // optional: update cache instantly (optimistic-like)
//       queryClient.invalidateQueries({
//         queryKey: ["messages", variables.conversationId],
//       });
//     },
//   });
// };


// export const useSendMessage = () => {
//   return useMutation({
//     mutationFn: async (data) => {
//       const res = await chatService.messageCreate(data);
//       return res.data;
//     },
//   });
// };

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await chatService.messageCreate(data);
      return res.data.data; // ✅ FIXED
      console.log(res.data.data);
    },

    onSuccess: (newMessage, variables) => {
      queryClient.setQueryData(["conversations"], (old) => {
        if (!old) return old;

        const updated = old.data.map((conv) => {
          if (conv.id !== variables.conversationId) return conv;

          return {
            ...conv,
            lastMessage: newMessage, // ✅ now correct shape
          };
        });

        const sorted = updated.sort((a, b) => {
          if (a.id === variables.conversationId) return -1;
          if (b.id === variables.conversationId) return 1;
          return 0;
        });

        return {
          ...old,
          data: sorted,
        };
      });
    },
  });
};



export const useInfiniteMessages = (conversationId) => {
  return useInfiniteQuery({
    queryKey: ["messages", conversationId],

    queryFn: async ({ pageParam }) => {
      const res = await chatService.getMessage({
        conversationId,
        cursor: pageParam,
        limit: 20,
      });

      return res;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor || undefined;
    },

    enabled: !!conversationId,

    // 🔥 ADD THESE
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};



export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await chatService.getConversations();
      return res.data;
    },
    staleTime: Infinity,
    gcTime: Infinity
  });
};



export const useDeleteForMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ messageId }) => {
      const res = await chatService.deleteForme(messageId);
      // console.log("DELETE RESPONSE:", res);
      return res.data.data;
    },
    onSuccess: ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: {
                ...page.data.data,
                messages: page.data.data.messages.filter(
                  (m) => m.id !== messageId
                ),
              },
            },
          })),
        };
      });
    }
  });
};



export const useDeleteForEveryone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ messageId }) => {
      const res = await chatService.deleteForEveryone(messageId);
      return res.data.data;
    },

    onSuccess: ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: {
                ...page.data.data,
                messages: page.data.data.messages.map((m) =>
                  m.id === messageId
                    ? {
                      ...m,
                      content: "This message was deleted",
                      isDeleted: true,
                    }
                    : m
                ),
              },
            },
          })),
        };
      });
    },
  });
};



export const useTogglePin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ messageId }) => {
      const res = await chatService.togglePin(messageId);
      return res.data.data;
    },

    onSuccess: ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: {
                ...page.data.data,
                conversation: {
                  ...page.data.data.conversation,
                  pinnedMessageId: messageId || null,
                },
              },
            },
          })),
        };
      });
    },
  });
};



export const useToggleMute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ conversationId }) => {
      const res = await chatService.toggleMute(conversationId);
      return res.data.data;
    },

    onSuccess: ({ conversationId, isMuted }) => {

      // ✅ 1. Update conversation list
      queryClient.setQueryData(["conversations"], (old) => {
        if (!old) return old;

        const list = old.data || old;

        const updated = list.map((conv) =>
          conv.id === conversationId
            ? { ...conv, isMuted }
            : conv
        );

        return old.data ? { ...old, data: updated } : updated;
      });

      // ✅ 2. 🔥 UPDATE CURRENT CHAT (THIS IS YOUR BUG FIX)
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: {
                ...page.data.data,
                conversation: {
                  ...page.data.data.conversation,
                  isMuted, // 🔥 THIS WAS MISSING
                },
              },
            },
          })),
        };
      });
    },
  });
};