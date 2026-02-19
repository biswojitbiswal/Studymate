import { sessionService } from "@/services/public/session.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export function useClassSessions(params) {
  return useQuery({
    queryKey: ["class-sessions", params],
    queryFn: async () => {
      const res = await sessionService.getByClass(params);
      return res.data;
    },
    enabled: !!params?.classId,
    keepPreviousData: true,
    placeholderData: (prev) => prev,
  });
}


export function useUpcomingSessions() {
  return useQuery({
    queryKey: ["upcoming-sessions"],
    queryFn: async () => {
      const res = await sessionService.getUpcoming();
      return res.data;
    },
    refetchInterval: 1000 * 60, // auto refresh every 1 min
  });
}


export function useCreatePrivateSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: sessionService.createPrivateRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"] });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"] });
    },
  });
}



export function useCancelSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (sessionId) => sessionService.cancel(sessionId),

    onMutate: async (sessionId) => {
      await qc.cancelQueries({ queryKey: ["class-sessions"] });

      const prev = qc.getQueriesData({ queryKey: ["class-sessions"] });

      qc.setQueriesData({ queryKey: ["class-sessions"] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((s) =>
            s.id === sessionId ? { ...s, status: "CANCELLED" } : s
          ),
        };
      });

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      ctx?.prev?.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"] });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"] });
    },
  });
}


export function useApproveSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (sessionId) => sessionService.approve(sessionId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"] });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"] });
    },
  });
}



export function useRejectSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (sessionId) => sessionService.reject(sessionId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"] });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"] });
    },
  });
}


export function useRescheduleSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, data }) =>
      sessionService.reschedule(sessionId, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"] });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"] });
    },
  });
}


export function useCreateExtraSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: sessionService.createExtra,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"] });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"] });
    },
  });
}



export function useCreateDboutSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: sessionService.createDbout,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"] });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"] });
    },
  });
}
