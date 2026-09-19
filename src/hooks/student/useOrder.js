import { orderService } from "@/services/student/order.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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



export const useStudentOrder = (id) => {
  return useQuery({
    queryKey: ["my-order", id],
    queryFn: async () => {
      const res = await orderService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useInvoiceStatus = (orderId, enabled = false) => {
  return useQuery({
    queryKey: ["invoice", orderId],
    queryFn: async () => {
      const res = await orderService.getInvoice(orderId);
      return res.data;
    },
    enabled: Boolean(orderId && enabled),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.invoice?.status;
      return status === "PENDING" || status === "PROCESSING" ? 2000 : false;
    },
  });
};

export const usePrepareInvoice = (orderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => orderService.prepareInvoice(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice", orderId] });
      queryClient.invalidateQueries({ queryKey: ["my-order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};
