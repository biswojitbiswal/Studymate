"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import LoadingScreen from "../common/LoadingScreen";

function homeForUser(user) {
  if (user?.role === "TUTOR") return "/dashboard/tutor";
  if (user?.role === "ADMIN") return "/dashboard/admin";
  if (user?.signupIntent === "TUTOR") return "/tutor-apply";
  return "/dashboard/student";
}

/**
 * RequireAuth:
 * - role: optional string or array of allowed roles ("tutor" | "student" | "admin")
 * - children: page content
 *
 * Behavior:
 * 1. If user exists in store and role matches → render children
 * 2. If user missing → attempt tryRefresh() once
 * 3. If still missing or wrong role → redirect to /signin
 * 4. Shows a simple "Loading..." while checking
 */
export default function RequireAuth({ children, role = null }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const tryRefresh = useAuthStore((s) => s.tryRefresh);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function check() {
      // If user exists, just verify role
      if (user) {
        const isTutorApplicant =
          user.role === "STUDENT" && user.signupIntent === "TUTOR";

        if (isTutorApplicant) {
          router.replace("/tutor-apply");
          return;
        }

        if (role) {
          const allowed = Array.isArray(role) ? role : [role];
          if (!allowed.includes(user.role)) {
            router.replace(homeForUser(user));
            return;
          }
        }
        if (mounted) setChecking(false);
        return;
      }

      // Try refresh once
      const result = await tryRefresh();
      if (result && result.user) {
        const isTutorApplicant =
          result.user.role === "STUDENT" &&
          result.user.signupIntent === "TUTOR";

        if (isTutorApplicant) {
          router.replace("/tutor-apply");
          return;
        }

        // role check
        if (role) {
          const allowed = Array.isArray(role) ? role : [role];
          if (!allowed.includes(result.user.role)) {
            router.replace(homeForUser(result.user));
            return;
          }
        }
        if (mounted) setChecking(false);
        return;
      }

      // cannot rehydrate: redirect to signin
      router.replace("/signin");
    }

    check();
    return () => (mounted = false);
  }, [user, tryRefresh, router, role]);

  if (checking) {
    return <div className="min-h-[200px] flex items-center justify-center">
      <LoadingScreen />
    </div>;
  }

  return <>{children}</>;
}
