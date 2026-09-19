"use client";

import RequireAuth from "@/components/auth/RequireAuth";

export default function CheckoutLayout({ children }) {
  return <RequireAuth role="STUDENT">{children}</RequireAuth>;
}
