import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { subjectService } from "@/services/admin/subject.service";

/* =========================
   GET BOARDS (LIST)
========================= */
export function useSubjects({ page, limit, search }) {
  // loading state,error state,retry logic,caching logic,refetch logic React Query handles ALL of that.
  return useQuery({
    queryKey: ["subjects", page, limit, search],
    queryFn: async () => {
      const res = await subjectService.getAll({
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
export function useSubject(id) {
  return useQuery({
    queryKey: ["subject", id],
    queryFn: () => subjectService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE BOARD
========================= */
export function useCreateSubject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: subjectService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}

/* =========================
   UPDATE BOARD
========================= */
export function useUpdateSubject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      subjectService.update(id, formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}

/* =========================
   DELETE BOARD (OPTIMISTIC)
========================= */
export function useDeleteSubject({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["subjects", page, limit, search];

  return useMutation({
    mutationFn: subjectService.remove,

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
      qc.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}

