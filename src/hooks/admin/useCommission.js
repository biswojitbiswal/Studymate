import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { commissionService } from "@/services/admin/commission.service";

/* =========================
   GET COMMISSIONS (LIST)
========================= */
export function useCommissions({ page, limit, search }) {
  return useQuery({
    queryKey: ["commissions", { page, limit, search }],
    queryFn: async () => {
      const res = await commissionService.getAll({
        page,
        limit,
        search,
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}



/* =========================
   GET COMMISSION (BY ID)
========================= */
export function useCommission(id) {
  return useQuery({
    queryKey: ["commission", id],
    queryFn: () => commissionService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE COMMISSION
========================= */
export function useCreateCommission() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: commissionService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["commissions"] });
    },
  });
}

/* =========================
   UPDATE COMMISSION
========================= */
export function useUpdateCommission() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      commissionService.update(id, payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["commissions"] });
    },
  });
}

/* =========================
   DELETE COMMISSION (OPTIMISTIC)
========================= */
export function useDeleteCommission({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["commissions", { page, limit, search }];

  return useMutation({
    mutationFn: commissionService.remove,

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey });

      const prev = qc.getQueryData(queryKey);

      qc.setQueryData(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.filter((c) => c.id !== id),
          total: Math.max(old.total - 1, 0),
        };
      });

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(queryKey, ctx.prev);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["commissions"] });
    },
  });
}


