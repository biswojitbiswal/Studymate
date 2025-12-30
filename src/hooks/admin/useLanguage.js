import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { languageService } from "@/services/admin/language.service";

/* =========================
   GET BOARDS (LIST)
========================= */
export function useLanguages({ page, limit, search }) {
  // loading state,error state,retry logic,caching logic,refetch logic React Query handles ALL of that.
  return useQuery({
    queryKey: ["languages", page, limit, search],
    queryFn: async () => {
      const res = await languageService.getAll({
        page,
        limit,
        search,
      });
      return res.data; // { items, total }
    },
    keepPreviousData: true,
  });
}



export function usePublicLanguages() {
  // loading state,error state,retry logic,caching logic,refetch logic React Query handles ALL of that.
  return useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const res = await languageService.getForPublic();
      return res.data.data;
    },
    keepPreviousData: true,
  });
}


/* =========================
   GET BOARDS (BY ID)
========================= */
export function useLanguage(id) {
  return useQuery({
    queryKey: ["language", id],
    queryFn: () => languageService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE BOARD
========================= */
export function useCreateLanguage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: languageService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["languages"] });
    },
  });
}

/* =========================
   UPDATE BOARD
========================= */
export function useUpdateLanguage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      languageService.update(id, formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["languages"] });
    },
  });
}

/* =========================
   DELETE BOARD (OPTIMISTIC)
========================= */
export function useDeleteLanguage({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["languages", page, limit, search];

  return useMutation({
    mutationFn: languageService.remove,

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
      qc.invalidateQueries({ queryKey: ["languages"] });
    },
  });
}

