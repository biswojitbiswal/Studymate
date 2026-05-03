import { tutorDashboardService } from "@/services/tutor/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useTutorAnalytics = ({ month, year }) => {
  return useQuery({
    queryKey: ["tutor-analytics", month, year], // 🔥 important
    queryFn: async () => {
      const res = await tutorDashboardService.getTutorAnalytics({
        month,
        year,
      });
      return res.data.data;
    },
    enabled: !!month && !!year, // only run when ready
    staleTime: 1000 * 60 * 5, // cache 5 min
    refetchOnWindowFocus: false,
  });
};