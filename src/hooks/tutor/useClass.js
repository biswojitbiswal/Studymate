import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { classService } from "@/services/tutor/class.sevice";

/* =========================
   GET TASKS (LIST)
========================= */
// export function useclasses({ page, limit, search, status, type, visibility, sortBy, sortOrder }) {
//     // loading state,error state,retry logic,caching logic,refetch logic React Query handles ALL of that.
//     return useQuery({
//         queryKey: ["classes", page, limit, search, status, type, visibility, sortBy, sortOrder],
//         queryFn: async () => {
//             const res = await classService.getAll({
//                 page,
//                 limit,
//                 search,
//                 status,
//                 type,
//                 visibility,
//                 sortBy,
//                 sortOrder
//             });
//             return res.data; // { items, total }
//         },
//         placeholderData: (prev) => prev,
//     });
// }

export function useClasses(params) {
    const filters = {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        search: params.search ?? "",
        status: params.status ?? undefined,
        type: params.type ?? undefined,
        visibility: params.visibility ?? undefined,
        sortBy: params.sortBy ?? "createdAt",
        sortOrder: params.sortOrder ?? "desc",
    };

    return useQuery({
        queryKey: ["classes", filters],
        queryFn: async () => {
            const res = await classService.getAll(filters);
            return res.data;
        },
        keepPreviousData: true,
        staleTime: 30_000,
    });
}


/* =========================
   GET Task (BY ID)
========================= */
export function useClass(id) {
    return useQuery({
        queryKey: ["class", id],
        queryFn: async () => {
            const res = await classService.getById(id);
            return res.data;
        },
        enabled: !!id,
    });
}


/* =========================
   CREATE Task
========================= */
export function useCreateClass() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: classService.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["classes"] });
        },
    });
}

/* =========================
   UPDATE TASK
========================= */
export function useUpdateClass() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }) =>
            classService.update(id, formData),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["classes"] });
        },

        onError: () => {
        },
    });
}


/* =========================
   Publish Class
========================= */
export function usePublishClass() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id }) => classService.publish(id),

        onMutate: async ({ id }) => {
            await qc.cancelQueries({ queryKey: ["classes"] });

            // Snapshot ALL task queries (pagination, filters, etc.)
            const prev = qc.getQueriesData({ queryKey: ["classes"] });

            qc.setQueriesData({ queryKey: ["classes"] }, (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map((cls) =>
                        cls.id === id ? { ...cls, status: "PUBLISHED" } : cls
                    ),
                };
            });


            return { prev };
        },

        onError: (_err, _vars, ctx) => {
            if (ctx?.prev) {
                ctx.prev.forEach(([key, data]) => {
                    qc.setQueryData(key, data);
                });
            }
        },

        onSettled: () => {
            qc.invalidateQueries({ queryKey: ["classes"] });
        },
    });
}




/* =========================
   DELETE TASK (OPTIMISTIC)
========================= */
export function useArchiveClass() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: classService.archive,

        onMutate: async (classId) => {
            await qc.cancelQueries({ queryKey: ["classes"] });

            const previousQueries = qc.getQueriesData({
                queryKey: ["classes"],
            });

            previousQueries.forEach(([queryKey, old]) => {
                if (!old || !Array.isArray(old.data)) return;

                qc.setQueryData(queryKey, {
                    ...old,
                    data: old.data.filter((c) => c.id !== classId),
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
            qc.invalidateQueries({ queryKey: ["classes"] });
        },
    });
}




