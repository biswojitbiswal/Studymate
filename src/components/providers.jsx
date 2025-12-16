"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  const tryRefresh = useAuthStore((s) => s.tryRefresh);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    console.log("🔥 Providers mounted, calling tryRefresh");
    tryRefresh();
  }, []);

  if (user === undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
