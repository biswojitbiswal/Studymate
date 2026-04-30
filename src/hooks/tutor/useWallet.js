import { walletService } from "@/services/tutor/wallet.service";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => walletService.create(data),

    onSuccess: () => {
      // 🔁 refresh data after withdrawal
      queryClient.invalidateQueries({ queryKey: ["tutor-withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
};



export const useTutorWithdrawals = (params) => {
  return useQuery({
    queryKey: ["tutor-withdrawals", params],
    queryFn: () => walletService.getForTutor(params),
    keepPreviousData: true,
  });
};


export const useAllWithdrawals = (params) => {
  return useQuery({
    queryKey: ["all-withdrawals", params],
    queryFn: () => walletService.getAll(params),
    keepPreviousData: true,
  });
};