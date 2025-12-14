import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { boardService } from "@/services/admin/board.service";

/* =========================
   GET BOARDS (LIST)
========================= */
export function useBoards({ page, limit, search }) {
  // loading state,error state,retry logic,caching logic,refetch logic React Query handles ALL of that.
  return useQuery({
    queryKey: ["boards", page, limit, search],
    queryFn: async () => {
      const res = await boardService.getAll({
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
export function useBoard(id) {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => boardService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE BOARD
========================= */
export function useCreateBoard() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: boardService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

/* =========================
   UPDATE BOARD
========================= */
export function useUpdateBoard() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      boardService.update(id, formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

/* =========================
   DELETE BOARD (OPTIMISTIC)
========================= */
export function useDeleteBoard({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["boards", page, limit, search];

  return useMutation({
    mutationFn: boardService.remove,

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
      qc.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

