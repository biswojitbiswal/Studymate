import { useQuery } from "@tanstack/react-query";
import { publicTutorService } from "@/services/public/tutor.service";

export function useBrowseTutors(params = {}) {
  return useQuery({
    queryKey: ["browse-tutors", params],
    queryFn: async () => {
      const response = await publicTutorService.browse(params);
      return response.data?.data ?? response.data;
    },
    placeholderData: (previousData) => previousData,
  });
}
