import { useQuery } from "@tanstack/react-query";
import { publicTutorService } from "@/services/public/tutor.service";

export function useBrowseTutors(params = {}) {
  return useQuery({
    queryKey: ["browse-tutors", params],
    queryFn: async () => {
      const response = await publicTutorService.browse(params);
      const body = response.data;
      return body?.totalTutor !== undefined ? body : body?.data ?? body;
    },
    placeholderData: (previousData) => previousData,
  });
}

export function useBrowseTutor(id) {
  return useQuery({
    queryKey: ["browse-tutor", id],
    queryFn: async () => {
      const response = await publicTutorService.getById(id);
      return response.data?.data ?? response.data;
    },
    enabled: Boolean(id),
  });
}
