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


export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await chatService.messageCreate(data);
      return res.data;
    },

    onSuccess: (data, variables) => {
      // optional: update cache instantly (optimistic-like)
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
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
  });
};



export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await chatService.getConversations();
      return res.data;
    },
    staleTime: 1000 * 60,
  });
};