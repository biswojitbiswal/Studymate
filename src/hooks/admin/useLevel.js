import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { levelService } from "@/services/admin/level.service";

/* =========================
   GET BOARDS (LIST)
========================= */
export function useLevels({ page, limit, search }) {
  // loading state,error state,retry logic,caching logic,refetch logic React Query handles ALL of that.
  return useQuery({
    queryKey: ["levels", page, limit, search],
    queryFn: async () => {
      const res = await levelService.getAll({
        page,
        limit,
        search,
      });
      return res.data; // { items, total }
    },
    keepPreviousData: true,
  });
}


/* =========================
   GET BOARDS (BY ID)
========================= */
export function useLevel(id) {
  return useQuery({
    queryKey: ["level", id],
    queryFn: () => levelService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE BOARD
========================= */
export function useCreateLevel() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: levelService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["levels"] });
    },
  });
}

/* =========================
   UPDATE BOARD
========================= */
export function useUpdateLevel() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      levelService.update(id, formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["levels"] });
    },
  });
}

/* =========================
   DELETE BOARD (OPTIMISTIC)
========================= */
export function useDeleteLevel({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["levels", page, limit, search];

  return useMutation({
    mutationFn: levelService.remove,

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
      qc.invalidateQueries({ queryKey: ["levels"] });
    },
  });
}

