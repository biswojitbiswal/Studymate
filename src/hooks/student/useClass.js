import { classService } from "@/services/student/class.services";
import {
  useQuery,
} from "@tanstack/react-query";



export function useEnrolledClasses({ page, limit, search }) {
  return useQuery({
    queryKey: ["enrolled-classes", page, limit, search],
    queryFn: async () => {
      const res = await classService.getAll({
        page,
        limit,
        search,
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
}