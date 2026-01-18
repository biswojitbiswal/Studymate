import { tutorService } from "@/services/tutor/tutor.service";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

/* =========================
   GET CURRENT TUTOR (ME)
========================= */
export function useMyTutor() {
  return useQuery({
    queryKey: ["tutor", "me"],
    queryFn: async () => {
      const res = await tutorService.getForMe();
      return res.data;
    },
    // only enabled if tutor exists on backend
    retry: false,
  });
}

/* =========================
   GET TUTORS (LIST)
   (Public / Admin)
========================= */
export function useTutors({ page, limit, search }) {
  return useQuery({
    queryKey: ["tutors", page, limit, search],
    queryFn: async () => {
      const res = await tutorService.getAll({
        page,
        limit,
        search,
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}

/* =========================
   GET TUTOR BY ID
========================= */
export function useTutor(id) {
  return useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const res = await tutorService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================
   APPLY AS TUTOR
========================= */
export function useTutorApply() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      tutorService.tutorApply(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutor", "me"] });
    },
  });
}

/* =========================
   UPDATE TUTOR PROFILE (ME)
========================= */
export function useUpdateTutorProfile() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData) =>
      tutorService.update(formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutor", "me"] });
    },
  });
}

/* =========================
   APPROVE TUTOR (ADMIN)
========================= */
export function useApproveTutor() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (tutorId) =>
      tutorService.tutorApproved(tutorId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutors"] });
      qc.invalidateQueries({ queryKey: ["tutor", "me"] });
    },
  });
}
