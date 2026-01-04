import { aminClassService } from "@/services/admin/class.service";
import { classService } from "@/services/tutor/class.service";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

/* =========================
   GET TASKS (LIST)
========================= */
export function useAdminClasses(params) {
    const filters = {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        search: params.search ?? "",
        status: params.status ?? undefined,
        type: params.type ?? undefined,
        visibility: params.visibility ?? undefined,
    };

    return useQuery({
        queryKey: ["admin", "classes", filters],
        queryFn: async () => {
            const res = await aminClassService.getAll(filters);
            return res.data;
        },
        keepPreviousData: true,
        staleTime: 30_000,
    });
}



/* =========================
   GET Task (BY ID)
========================= */
export function useAdminClass(id) {
    return useQuery({
        queryKey: ["admin", "class", id],
        queryFn: async () => {
            const res = await classService.getById(id);
            return res.data;
        },
        enabled: !!id,
    });
}



/* =========================
   DELETE TASK (OPTIMISTIC)
========================= */
export function useAdminArchiveClass() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: aminClassService.archive,

        onMutate: async (classId) => {
            await qc.cancelQueries({ queryKey: ["admin", "classes"] });

            const previousQueries = qc.getQueriesData({
                queryKey: ["admin", "classes"],
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
            qc.invalidateQueries({ queryKey: ["admin", "classes"] });
        },
    });
}





