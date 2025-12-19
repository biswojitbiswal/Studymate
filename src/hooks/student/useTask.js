import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { taskService } from "@/services/student/task.services";

/* =========================
   GET TASKS (LIST)
========================= */
export function useTasks({ page, limit, search, status, range, date }) {
  // loading state,error state,retry logic,caching logic,refetch logic React Query handles ALL of that.
  return useQuery({
    queryKey: ["tasks", page, limit, search, status, range, date],
    queryFn: async () => {
      const res = await taskService.getAll({
        page,
        limit,
        search,
        status,
        range,
        date
      });
      return res.data; // { items, total }
    },
    placeholderData: (prev) => prev,
  });
}


/* =========================
   GET Task (BY ID)
========================= */
export function useTask(id) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE Task
========================= */
export function useCreateTask() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

/* =========================
   UPDATE TASK
========================= */
export function useUpdateTask() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      taskService.update(id, formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: () => {
    },
  });
}


/* =========================
   COMPLETE TASK
========================= */
export function useCompleteTask() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => taskService.complete(id),

    onMutate: async ({ id }) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });

      // Snapshot ALL task queries (pagination, filters, etc.)
      const prev = qc.getQueriesData({ queryKey: ["tasks"] });

      qc.setQueriesData({ queryKey: ["tasks"] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            data: old.data.data.map((task) =>
              task.id === id
                ? { ...task, status: "COMPLETED" }
                : task
            ),
          },
        };
      });

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        ctx.prev.forEach(([key, data]) => {
          qc.setQueryData(key, data);
        });
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}





/* =========================
   DELETE TASK (OPTIMISTIC)
========================= */
export function useDeleteTask({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["tasks", page, limit, search];

  return useMutation({
    mutationFn: taskService.remove,

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey });

      const prev = qc.getQueryData(queryKey);

      qc.setQueryData(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.filter((b) => b.id !== id),
          total: Math.max(old.total - 1, 0),
        };
      });

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(queryKey, ctx.prev);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

