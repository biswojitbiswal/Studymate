import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { timeoffService } from "@/services/tutor/timeoff.service";

/* =========================
   GET TIMEOFF (LIST)
========================= */
export function useTimeoff(params) {
  const filters = {
    page: params?.page ?? 1,
    limit: params?.limit ?? 10,
    fromDate: params?.fromDate ?? undefined,
    toDate: params?.toDate ?? undefined,
  };

  return useQuery({
    queryKey: ["timeoff", filters],
    queryFn: async () => {
      const res = await timeoffService.getAll(filters);
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 30_000,
  });
}

/* =========================
   CREATE TIMEOFF
========================= */
export function useCreateTimeoff() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: timeoffService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["timeoff"] });
    },
  });
}

/* =========================
   DELETE TIMEOFF (OPTIMISTIC)
========================= */
export function useDeleteTimeoff() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: timeoffService.delete,

    onMutate: async (timeoffId) => {
      await qc.cancelQueries({ queryKey: ["timeoff"] });

      const previousQueries = qc.getQueriesData({
        queryKey: ["timeoff"],
      });

      previousQueries.forEach(([queryKey, old]) => {
        if (!old || !Array.isArray(old.data)) return;

        qc.setQueryData(queryKey, {
          ...old,
          data: old.data.filter((t) => t.id !== timeoffId),
          total: Math.max((old.total ?? 1) - 1, 0),
        });
      });

      return { previousQueries };
    },

    onError: (_err, _id, ctx) => {
      ctx?.previousQueries?.forEach(([queryKey, data]) => {
        qc.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["timeoff"] });
    },
  });
}
