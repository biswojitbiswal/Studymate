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

export function useBrowseTutor(slug) {
  return useQuery({
    queryKey: ["browse-tutor", slug],
    queryFn: async () => {
      const response = await publicTutorService.getById(slug);
      return response.data?.data ?? response.data;
    },
    enabled: Boolean(slug),
  });
}
