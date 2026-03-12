import { orderService } from "@/services/student/order.service";
import { useQuery } from "@tanstack/react-query";

export const useMyOrders = (params = {}) => {
  return useQuery({
    queryKey: ["my-orders", params],
    queryFn: async () => {
      const res = await orderService.getMyOrders(params);
      return res.data;
    },
    keepPreviousData: true,
  });
};