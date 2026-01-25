import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { commonClassService } from "@/services/public/class.service";

/* =========================
   GET Classes (LIST)
========================= */
export function useBrowseClasses(params = {}) {
    const filters = {
        page: params.page ?? 1,
        limit: params.limit ?? 10,

        search: params.search ?? "",
        sortBy: params.sortBy ?? "createdAt",
        sortOrder: params.sortOrder ?? "desc",

        subjectIds: params.subjectIds ?? [],
        boardIds: params.boardIds ?? [],
        levelIds: params.levelIds ?? [],
        languageIds: params.languageIds ?? [],

        type: params.type ?? null,

        maxPrice: params.maxPrice ?? null,
        paid: params.paid ?? null,

        minRating: Array.isArray(params.ratings) && params.ratings.length
            ? Math.max(...params.ratings)
            : null,
    };

    return useQuery({
        queryKey: ["browse-classes", filters],
        queryFn: async () => {
            const res = await commonClassService.getAllBrowseClass(filters);
            return res?.data?.data;
        },
        keepPreviousData: true,
        staleTime: 30_000,
    });
}



/* =========================
   GET Class (BY ID)
========================= */
export function useBrowseClass(id) {
    return useQuery({
        queryKey: ["browse-class", id],
        queryFn: async () => {
            const res = await commonClassService.getBwoseClassById(id);
            return res.data;
        },
        enabled: !!id,
    });
}
