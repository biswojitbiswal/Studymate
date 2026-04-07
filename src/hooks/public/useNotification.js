import { notificationService } from "@/services/public/notification.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const res = await notificationService.getAll();
            return res.data;
        },
        // refetchOnWindowFocus: false,
    });
};


export const useUnreadNotificationCount = () => {
    return useQuery({
        queryKey: ["notifications", "count"],
        queryFn: async () => {
            const res = await notificationService.getUnreadCount();
            return res.data.data;
        },
        refetchOnWindowFocus: false,
    });
};


export const useMarkNotificationAsRead = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id) => notificationService.markAsRead(id),

        // 🔥 optimistic update
        onMutate: async (id) => {
            await qc.cancelQueries({ queryKey: ["notifications"] });

            const prev = qc.getQueryData(["notifications"]);

            qc.setQueryData(["notifications"], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.filter((n) => n.id !== id),
                };
            });

            // also update count
            qc.setQueryData(["notifications", "count"], (old) =>
                old > 0 ? old - 1 : 0
            );

            return { prev };
        },

        onError: (_err, _vars, ctx) => {
            if (ctx?.prev) {
                qc.setQueryData(["notifications"], ctx.prev);
            }
        },

        onSettled: () => {
            qc.invalidateQueries({ queryKey: ["notifications"] });
            qc.invalidateQueries({ queryKey: ["notifications", "count"] });
        },
    });
};


export const useMarkAllNotificationsAsRead = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: notificationService.markAllAsRead,

        onMutate: async () => {
            await qc.cancelQueries({ queryKey: ["notifications"] });

            const prev = qc.getQueryData(["notifications"]);

            // clear all notifications
            qc.setQueryData(["notifications"], []);

            // reset count
            qc.setQueryData(["notifications", "count"], 0);

            return { prev };
        },

        onError: (_err, _vars, ctx) => {
            if (ctx?.prev) {
                qc.setQueryData(["notifications"], ctx.prev);
            }
        },

        onSettled: () => {
            qc.invalidateQueries({ queryKey: ["notifications"] });
            qc.invalidateQueries({ queryKey: ["notifications", "count"] });
        },
    });
};