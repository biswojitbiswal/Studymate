import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { taxService } from "@/services/admin/tax.service";

/* =========================
   GET TAX (LIST)
========================= */
export function useTaxes({ page, limit, search }) {
  return useQuery({
    queryKey: ["taxes", page, limit, search],
    queryFn: async () => {
      const res = await taxService.getAll({
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
   GET TAX (BY ID)
========================= */
export function useTax(id) {
  return useQuery({
    queryKey: ["tax", id],
    queryFn: () => taxService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE TAX
========================= */
export function useCreateTax() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: taxService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

/* =========================
   UPDATE TAX
========================= */
export function useUpdateTax() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      taxService.update(id, formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

/* =========================
   DELETE TAX (OPTIMISTIC)
========================= */
export function useDeleteTax({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["taxes", page, limit, search];

  return useMutation({
    mutationFn: taxService.remove,

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey });

      const prev = qc.getQueryData(queryKey);

      qc.setQueryData(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.filter((b) => b.id !== id),
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
      qc.invalidateQueries({ queryKey: ["taxes"] });
    },
  });
}

