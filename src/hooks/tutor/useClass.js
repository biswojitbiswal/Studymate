import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { classService } from "@/services/tutor/class.service";

/* =========================
   GET Classes (LIST)
========================= */
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
   GET Class (BY ID)
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
   CREATE Class
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
   UPDATE Class
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
   PUBLISH CLASS (OPTIMISTIC)
========================= */
export function usePublishClass() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (classId) =>
            classService.publish(classId),

        onMutate: async (classId) => {
            // 1️⃣ Stop outgoing refetches
            await qc.cancelQueries({ queryKey: ["classes"] });

            // 2️⃣ Snapshot ALL class queries (pagination, filters, etc.)
            const previousQueries = qc.getQueriesData({
                queryKey: ["classes"],
            });

            // 3️⃣ Optimistically update ALL cached lists
            previousQueries.forEach(([queryKey, old]) => {
                if (!old || !Array.isArray(old.data)) return;

                qc.setQueryData(queryKey, {
                    ...old,
                    data: old.data.map((cls) =>
                        cls.id === classId
                            ? { ...cls, status: "PUBLISHED" }
                            : cls
                    ),
                });
            });

            return { previousQueries };
        },

        // 4️⃣ Rollback on error
        onError: (_err, _id, ctx) => {
            ctx?.previousQueries?.forEach(([queryKey, data]) => {
                qc.setQueryData(queryKey, data);
            });
        },

        // 5️⃣ Background refetch (no visible flicker)
        onSuccess: () => {
            setTimeout(() => {
                qc.invalidateQueries({ queryKey: ["classes"] });
            }, 800);
        },
    });
}





/* =========================
   DELETE Class (OPTIMISTIC)
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




