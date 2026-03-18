import { reviewService } from "@/services/public/review.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reviewService.create,

        onSuccess: (_, variables) => {
            // invalidate student review
            queryClient.invalidateQueries({
                queryKey: ["reviews", "student", variables.classId],
            });

            // invalidate all review lists
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
        },
    });
};


export const useUpdateReviewStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            reviewService.statusUpdate(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
        },
    });
};



export const useGetReviewByStudent = (classId) => {
    return useQuery({
        queryKey: ["reviews", "student", classId],
        queryFn: () => reviewService.getByStudent(classId),

        enabled: !!classId,
        retry: false, // important (you throw 404)
    });
};


export const useGetAllReviews = (params) => {
    return useQuery({
        queryKey: ["reviews", "list", params],
        queryFn: () => reviewService.getAll(params),

        keepPreviousData: true,
    });
};


export const useBrowseReviews = (params) => {
    return useQuery({
        queryKey: ["reviews", "browse", params],
        queryFn: () => reviewService.getBrowse(params),

        keepPreviousData: true,
    });
};