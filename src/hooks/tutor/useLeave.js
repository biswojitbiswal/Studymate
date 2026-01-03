import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { leaveService } from "@/services/tutor/leave.service";

/* =========================
   GET LEAVES (LIST)
========================= */
export function useLeave(params) {
  const filters = {
    page: params?.page ?? 1,
    limit: params?.limit ?? 10,
    fromDate: params?.fromDate ?? undefined,
    toDate: params?.toDate ?? undefined,
  };

  return useQuery({
    queryKey: ["leave", filters],
    queryFn: async () => {
      const res = await leaveService.getAll(filters);
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 30_000,
  });
}

/* =========================
   CREATE LEAVE
========================= */
export function useCreateLeave() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: leaveService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leave"] });
    },
  });
}

/* =========================
   DELETE LEAVE (OPTIMISTIC)
========================= */
export function useDeleteLeave() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: leaveService.delete,

    onMutate: async (leaveId) => {
      await qc.cancelQueries({ queryKey: ["leave"] });

      const previousQueries = qc.getQueriesData({
        queryKey: ["leave"],
      });

      previousQueries.forEach(([queryKey, old]) => {
        if (!old || !Array.isArray(old.data)) return;

        qc.setQueryData(queryKey, {
          ...old,
          data: old.data.filter((l) => l.id !== leaveId),
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
      qc.invalidateQueries({ queryKey: ["leave"] });
    },
  });
}
