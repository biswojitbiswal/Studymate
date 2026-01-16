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

