"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  const tryRefresh = useAuthStore((s) => s.tryRefresh);
  const user = useAuthStore((s) => s.user);

  // 🔑 Auth bootstrap (runs once)
  useEffect(() => {
    if (user === undefined) {
      tryRefresh();
    }
  }, [user, tryRefresh]);

  // ⛔ Block app until auth state is known
  if (user === undefined) {
    return (
      <div className="h-screen flex items-center justify-center text-sm text-gray-500">
        Restoring session...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
