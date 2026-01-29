import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { couponService } from "@/services/admin/coupon.service";

/* =========================
   GET COUPON (LIST)
========================= */
export function useCoupons({ page, limit, search }) {
  return useQuery({
    queryKey: ["coupons", page, limit, search],
    queryFn: async () => {
      const res = await couponService.getAll({
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
   GET COUPON (BY ID)
========================= */
export function useCoupon(id) {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: () => couponService.getById(id),
    enabled: !!id,
  });
}


/* =========================
   CREATE COUPON
========================= */
export function useCreateCoupon() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: couponService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
}

/* =========================
   UPDATE COUPON
========================= */
export function useUpdateCoupon() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      couponService.update(id, formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
}

/* =========================
   DELETE COUPON (OPTIMISTIC)
========================= */
export function useDeleteCoupon({ page, limit, search }) {
  const qc = useQueryClient();
  const queryKey = ["coupons", page, limit, search];

  return useMutation({
    mutationFn: couponService.remove,

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
      qc.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
}

