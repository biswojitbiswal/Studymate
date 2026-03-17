import { wishlistService } from "@/services/public/wishlist.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWishlist = (params) => {
    return useQuery({
        queryKey: ["wishlist", params],
        queryFn: () => wishlistService.getAll(params),
        keepPreviousData: true,
    });
};



export const useToggleWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => wishlistService.toggle(id),

        // 🔥 OPTIMISTIC UPDATE
        onMutate: async (id) => {
            // cancel both queries
            await Promise.all([
                queryClient.cancelQueries({ queryKey: ["wishlist"] }),
                queryClient.cancelQueries({ queryKey: ["browse-classes"] }),
            ]);

            // snapshot previous data
            const previousWishlist = queryClient.getQueriesData({
                queryKey: ["wishlist"],
            });

            const previousClasses = queryClient.getQueriesData({
                queryKey: ["browse-classes"],
            });

            // 🟢 1. Update wishlist (remove only - safe)
            previousWishlist.forEach(([key, oldData]) => {
                if (!oldData?.data) return;

                const exists = oldData.data.some((item) => item.id === id);

                if (!exists) return;

                const updated = oldData.data.filter((item) => item.id !== id);

                queryClient.setQueryData(key, {
                    ...oldData,
                    data: updated,
                });
            });

            // 🟢 2. Update browse classes (IMPORTANT)
            previousClasses.forEach(([key, oldData]) => {
                if (!oldData?.data) return;

                const updated = oldData.data.map((item) =>
                    item.id === id
                        ? { ...item, isWishlisted: !item.isWishlisted }
                        : item
                );

                queryClient.setQueryData(key, {
                    ...oldData,
                    data: updated,
                });
            });

            return { previousWishlist, previousClasses };
        },

        // 🔴 rollback on error
        onError: (err, id, context) => {
            context?.previousWishlist?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });

            context?.previousClasses?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });
        },

        // 🔄 sync with server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            queryClient.invalidateQueries({ queryKey: ["browse-classes"] });
        },
    });
};