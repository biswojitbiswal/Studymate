"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  // Create a central place to store all server data for this app bcoz we want one cache.

  return (
    // All components inside this tree can now access the same QueryClient.”
    // cache should be global
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
