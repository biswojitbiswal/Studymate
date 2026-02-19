import { orderService } from "@/services/public/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCheckoutDetails(classId, options = {}) {
  return useQuery({
    queryKey: ["checkout-details", classId],
    queryFn: async () => {
      const res = await orderService.getCheckoutDetails(classId);
      return res?.data?.data;
    },
    enabled: !!classId, // prevents firing before router param exists
    staleTime: 0,       // always refetch fresh pricing
    ...options,
  });
}



export function useCreateOrder(options = {}) {
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (payload) => {
      const res = await orderService.create(payload);
      return res?.data?.data;
    },
    ...options,
  });
}


export function useVerifyPayment(options = {}) {
  return useMutation({
    mutationKey: ["verify-payment"],
    mutationFn: async (payload) => {
      const res = await orderService.verify(payload);
      return res?.data;
    },
    ...options,
  });
}



export function useOrderStatus(orderId, options = {}) {
  return useQuery({
    queryKey: ["order-status", orderId],

    queryFn: async () => {
      const res = await orderService.getStatus(orderId);
      return res?.data;
    },

    enabled: !!orderId, // only run if orderId exists

    refetchInterval: (data) => {
      // stop polling if payment finished
      if (!data) return 2000;

      if (data.status === "PAID" || data.status === "FAILED" || data.status === "CANCELLED") {
        return false;
      }

      return 2000; // poll every 2 seconds
    },

    refetchIntervalInBackground: true,

    staleTime: 0, // never trust cache
    cacheTime: 0, // remove cache completely

    retry: false, // don't retry automatically (webhook delay is not an error)

    ...options,
  });
}