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