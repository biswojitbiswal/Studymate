import { resourcesService } from "@/services/tutor/resources.service";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


/* =========================
   GET RESOURCES
========================= */
export function useResources(classId, params = {}) {
  const filters = {
    page: Math.max(1, Number(params.page) || 1),
    limit: Math.max(1, Number(params.limit) || 10),
    search: params.search?.trim() || undefined,
  };

  return useQuery({
    queryKey: ["resources", classId, filters],
    queryFn: async () => {
      const res = await resourcesService.getAll(classId, filters);
      return res.data;
    },
    enabled: !!classId,
    keepPreviousData: true,
  });
}

/* =========================
   CREATE RESOURCE
========================= */
export function useCreateResource() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: resourcesService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}

/* =========================
   UPDATE RESOURCE
========================= */
export function useUpdateResource() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      resourcesService.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}

/* =========================
   DELETE RESOURCE
========================= */
export function useDeleteResource() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => resourcesService.delete(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}


export function useStudentResources(params = {}) {

  const filters = {
    page: Math.max(1, Number(params?.page) || 1),
    limit: Math.max(1, Number(params?.limit) || 10),
    search: String(params?.search || "").trim() || undefined,
    classId: params?.classId ?? undefined,
  };

  return useQuery({
    queryKey: ["student-resources", filters],

    queryFn: async () => {
      const res = await resourcesService.getForStudent(filters);
      return res.data;
    },

    keepPreviousData: true,
  });
}