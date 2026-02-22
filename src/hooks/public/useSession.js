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
          data: {
            ...old.data,
            data: old.data.data.map((s) =>
              s.id === sessionId
                ? { ...s, status: "CANCELLED_BY_TUTOR" }
                : s
            ),
          },
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


export function useCreateSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => {

      // PRIVATE CLASS (regular session)
      if (data.sessionType === "REGULAR") {
        return sessionService.createPrivateRequest(data);
      }

      // GROUP DOUBT
      if (data.sessionType === "DBOUT") {
        return sessionService.createDbout(data);
      }

      // GROUP EXTRA
      return sessionService.createExtra(data);
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["class-sessions"], exact: false });
      qc.invalidateQueries({ queryKey: ["upcoming-sessions"], exact: false });
    },
  });
}
