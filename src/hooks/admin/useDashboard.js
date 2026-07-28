import { adminDashboardService } from "@/services/admin/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminAnalytics = ({ fromDate, toDate }) => {
  return useQuery({
    queryKey: ["admin-analytics", fromDate, toDate], // 🔥 important
    queryFn: async () => {
      const res = await adminDashboardService.getAdminAnalytics({
        fromDate,
        toDate,
      });
      return res.data.data;
    },
    enabled: !!fromDate && !!toDate, // only run when ready
    staleTime: 1000 * 60 * 5, // cache 5 min
    refetchOnWindowFocus: false,
  });
};