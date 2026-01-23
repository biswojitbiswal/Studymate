import { studentService } from "@/services/student/student.service";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

/* =========================
   GET CURRENT STUDENT (ME)
========================= */
export function useMyStudent() {
  return useQuery({
    queryKey: ["student", "me"],
    queryFn: async () => {
      const res = await studentService.getForMe();
      return res.data;
    },
  });
}

/* =========================
   GET STUDENTS (LIST)
   (Admin / Tutor future use)
========================= */
export function useStudents({ page, limit, search }) {
  return useQuery({
    queryKey: ["students", page, limit, search],
    queryFn: async () => {
      const res = await studentService.getAll({
        page,
        limit,
        search,
      });
      return res.data.data; // { items, total }
    },
    keepPreviousData: true,
  });
}

/* =========================
   GET STUDENT BY ID
========================= */
export function useStudent(id) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const res = await studentService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================
   UPDATE CURRENT STUDENT (ME)
========================= */
export function useUpdateStudentProfile() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData) =>
      studentService.update(formData),

    onSuccess: () => {
      // 🔑 VERY IMPORTANT
      qc.invalidateQueries({ queryKey: ["student", "me"] });
    },
  });
}
