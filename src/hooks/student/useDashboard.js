import { studentDashboardService } from "@/services/student/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useStudentAnalytics = () => {
  return useQuery({
    queryKey: ["student-analytics"], // 🔥 important
    queryFn: async () => {
      const res = await studentDashboardService.getStudentAnalytics({});
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};