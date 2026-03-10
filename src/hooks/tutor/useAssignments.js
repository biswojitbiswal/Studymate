import { assignmentsService } from "@/services/tutor/assignments.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


/* =========================
   GET ASSIGNMENTS (TUTOR)
========================= */
export function useAssignments(classId, params = {}) {
  const filters = {
    page: Math.max(1, Number(params.page) || 1),
    limit: Math.max(1, Number(params.limit) || 10),
    search: params.search?.trim() || undefined,
    range: params.range || undefined,
  };

  return useQuery({
    queryKey: ["assignments", classId, filters],

    queryFn: async () => {
      const res = await assignmentsService.getAll(classId, filters);
      return res.data;
    },

    enabled: !!classId,
    keepPreviousData: true,
  });
}


/* =========================
   GET ASSIGNMENT DETAILS
========================= */
export function useAssignment(id) {
  return useQuery({
    queryKey: ["assignment", id],

    queryFn: async () => {
      const res = await assignmentsService.get(id);
      return res.data;
    },

    enabled: !!id,
  });
}


/* =========================
   CREATE ASSIGNMENT
========================= */
export function useCreateAssignment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: assignmentsService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
}


/* =========================
   UPDATE ASSIGNMENT
========================= */
export function useUpdateAssignment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      assignmentsService.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assignments"] });
      qc.invalidateQueries({ queryKey: ["assignment"] });
    },
  });
}


/* =========================
   DELETE ASSIGNMENT
========================= */
export function useDeleteAssignment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      assignmentsService.delete(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
}


/* =========================
   STUDENT ASSIGNED TASKS
========================= */
export function useStudentAssignments(params = {}) {

  const filters = {
    page: Math.max(1, Number(params?.page) || 1),
    limit: Math.max(1, Number(params?.limit) || 10),
    search: String(params?.search || "").trim() || undefined,
    status: params?.status ?? undefined,
    classId: params?.classId ?? undefined,
  };

  return useQuery({
    queryKey: ["student-assignments", filters],

    queryFn: async () => {
      const res = await assignmentsService.getForStudent(filters);
      return res.data;
    },

    keepPreviousData: true,
  });
}


/* =========================
   UPDATE ASSIGNMENT STATUS
========================= */
export function useUpdateAssignmentStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      assignmentsService.updateStatus(id, data),

    onMutate: async ({ id, data }) => {

      await qc.cancelQueries({ queryKey: ["student-assignments"] });

      const previous = qc.getQueryData(["student-assignments"]);

      qc.setQueryData(["student-assignments"], (old) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            data: {
              ...old.data.data,
              assignments: old.data.data.assignments.map((a) =>
                a.taskId === id
                  ? { ...a, status: data.status }
                  : a
              ),
            },
          },
        };
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        qc.setQueryData(["student-assignments"], context.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["student-assignments"] });
    },
  });
}