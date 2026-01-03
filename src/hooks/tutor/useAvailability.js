import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { availibilityService } from "@/services/tutor/availibility.service";

/* =========================
   GET AVAILABILITY (LIST)
========================= */
export function useAvailability(params = {}) {
    const filters = {
        page: Math.max(1, Number(params.page) || 1),
        limit: Math.max(1, Number(params.limit) || 10),
        search: params.search?.trim() || undefined,
        dayOfWeek: params?.dayOfWeek ?? undefined,
    };

    return useQuery({
        queryKey: ["availability", filters],
        queryFn: async () => {
            const res = await availibilityService.getAll(filters);
            return res.data;
        },
        keepPreviousData: true,
    });
}



/* =========================
   CREATE AVAILABILITY
========================= */
export function useCreateAvailability() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: availibilityService.create,

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["availability"] });
        },
    });
}


/* =========================
   UPDATE AVAILABILITY
========================= */
export function useUpdateAvailability() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            availibilityService.update(id, data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["availability"] });
        },
    });
}


/* =========================
   TOGGLE AVAILABILITY
========================= */
export function useToggleAvailability() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id) => availibilityService.toggle(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["availability"] });
        },
    });
}


/* =========================
   DELETE AVAILABILITY
========================= */
export function useDeleteAvailability() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id) => availibilityService.delete(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["availability"] });
        },
    });
}
