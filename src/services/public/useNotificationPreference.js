import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; 
import { preferenceService } from "./preference.service";



// 🔹 GET PREFERENCE
export function useNotificationPreference() {
    return useQuery({
        queryKey: ["notification-preference"],
        queryFn: async () => {
            const res = await preferenceService.get();
            return res.data.data || {
                emailEnabled: true,
                inAppEnabled: true,
                smsEnabled: false,
                pushEnabled: false,
            };
        },
    });
}


// 🔥 UPDATE (OPTIMISTIC)
export function useUpdateNotificationPreference() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data) => preferenceService.create(data),

        // 🔥 OPTIMISTIC UPDATE
        onMutate: async (newData) => {
            await qc.cancelQueries({ queryKey: ["notification-preference"] });

            const prev = qc.getQueryData(["notification-preference"]);

            // update instantly
            qc.setQueryData(["notification-preference"], (old) => ({
                ...old,
                ...newData,
            }));

            return { prev };
        },

        // ❌ rollback if error
        onError: (_err, _vars, ctx) => {
            if (ctx?.prev) {
                qc.setQueryData(["notification-preference"], ctx.prev);
            }
        },

        // 🔄 sync with backend
        onSettled: () => {
            qc.invalidateQueries({ queryKey: ["notification-preference"] });
        },
    });
}