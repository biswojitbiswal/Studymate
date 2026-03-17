import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { commonClassService } from "@/services/public/class.service";

/* =========================
   GET Classes (LIST)
========================= */
export function useBrowseClasses(params = {}, options = {},) {
    return useQuery({
        queryKey: ["browse-classes", params],
        queryFn: async () => {
            const res = await commonClassService.getAllBrowseClass(params);
            return res?.data?.data;
        },
        initialData: options.initialData,
        keepPreviousData: true,
        staleTime: 0,
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
