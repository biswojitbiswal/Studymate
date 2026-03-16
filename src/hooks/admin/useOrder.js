import { adminOrderService } from "@/services/admin/order.service";
import { useQuery } from "@tanstack/react-query";

export const useOrders = (params = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const res = await adminOrderService.getOrders(params);
      return res.data;
    },
    keepPreviousData: true,
  });
};



export const useAdminOrder = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await adminOrderService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};