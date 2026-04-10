import { authService } from "@/services/public/auth.service";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";



export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token) => authService.verifyEmail(token),
  });
}


export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) =>
      authService.toggleStatus(userId),

    onSuccess: () => {
      queryClient.invalidateQueries(["tutors"]);
      queryClient.invalidateQueries(["students"]);
    },
  });
}


export function useForgotPassword() {
  return useMutation({
    mutationFn: (email) =>
      authService.forgotPassword(email),
  });
}


export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, data }) =>
      authService.resetPassword(token, data),
  });
}


export function useChangePassword() {
  return useMutation({
    mutationFn: (data) =>
      authService.changePassword(data),
  });
}


export function useUpdateAdminProfile() {
  return useMutation({
    mutationFn: ({ userId, data }) =>
      authService.update(userId, data),
  });
}