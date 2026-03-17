import { wishlistService } from "@/services/public/wishlist.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWishlist = (params) => {
    return useQuery({
        queryKey: ["wishlist", params],
        queryFn: async () => {
            const res = await wishlistService.getAll(params);

            return {
                items: res?.data?.data || [],   // 👈 normalize here
                total: res?.data?.total || 0,
                page: res?.data?.page || 1,
                limit: res?.data?.limit || 10,
            };
        },
        keepPreviousData: true,
    });
};



export const useToggleWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => wishlistService.toggle(id),

        // 🔥 OPTIMISTIC UPDATE
        onMutate: async (id) => {
            const previousWishlist = queryClient.getQueriesData({
                queryKey: ["wishlist"],
            });

            const previousClasses = queryClient.getQueriesData({
                queryKey: ["browse-classes"],
            });

            const previousSingleClasses = queryClient.getQueriesData({
                queryKey: ["browse-class"],
            });

            // ✅ helper to safely extract array
            const getItems = (oldData) => {
                return (
                    oldData?.items ||            // new structure
                    oldData?.data?.data ||       // old structure
                    []
                );
            };

            // 🟢 1. Wishlist
            previousWishlist.forEach(([key, oldData]) => {
                const items = getItems(oldData);
                if (!Array.isArray(items)) return;

                const updated = items.filter((item) => item.id !== id);

                queryClient.setQueryData(key, {
                    ...oldData,
                    items: updated, // normalize forward
                });
            });

            // 🟢 2. Browse classes
            previousClasses.forEach(([key, oldData]) => {
                const items = getItems(oldData);
                if (!Array.isArray(items)) return;

                const updatedItems = items.map((item) =>
                    item.id === id
                        ? { ...item, isWishlisted: !item.isWishlisted }
                        : item
                );

                queryClient.setQueryData(key, {
                    ...oldData,
                    items: updatedItems,
                });
            });

            // 🟢 3. Single class
            previousSingleClasses.forEach(([key, oldData]) => {
                if (!oldData || typeof oldData !== "object") return;

                if (oldData.id === id) {
                    queryClient.setQueryData(key, {
                        ...oldData,
                        isWishlisted: !oldData.isWishlisted,
                    });
                }
            });

            return {
                previousWishlist,
                previousClasses,
                previousSingleClasses,
            };
        },

        // 🔴 rollback
        onError: (err, id, context) => {
            context?.previousWishlist?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });

            context?.previousClasses?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });

            context?.previousSingleClasses?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });
        },

        // 🔄 sync with server (safe mode)
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });

            // ⚠️ optional (can remove later for better UX)
            queryClient.invalidateQueries({ queryKey: ["browse-classes"] });
            queryClient.invalidateQueries({ queryKey: ["browse-class"] });
        },
    });
};