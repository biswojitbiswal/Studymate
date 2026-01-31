// src/store/auth.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API } from "@/lib/endpoint";
import { toast } from "sonner";

/* =========================================================
   Helpers (used by api-client)
   ========================================================= */

export function getAuthToken() {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("StudyNest_auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  try {
    useAuthStore.setState({ token });
  } catch { }
}

export function storeLogout() {
  try {
    const s = useAuthStore.getState();
    s?.logout?.();
  } catch { }
}

/* =========================================================
   Refresh dedupe (VERY IMPORTANT)
   ========================================================= */

let _refreshPromise = null;

/* =========================================================
   Auth Store
   ========================================================= */

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: undefined,
      token: null,

      /* ================= LOGIN ================= */

      login: async (email, password, role) => {
        const res = await fetch(`/api/v1${API.AUTH_SIGNIN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Signin failed");
        }

        const token = data?.accessToken ?? data?.data?.accessToken;
        const user = data?.user ?? data?.data?.user;

        if (!token || !user) {
          throw new Error("Invalid signin response");
        }

        set({ user, token });
        return { user, token };
      },

      /* ================= SIGNUP ================= */

      signup: async (payload) => {
        const res = await fetch(`/api/v1${API.AUTH_SIGNUP}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Signup failed");
        }

        const user = data?.user ?? data?.data?.user;
        return {user};
      },

      /* ================= REFRESH (FIXED) ================= */

      tryRefresh: async () => {
        console.log("🔥 tryRefresh CALLED", new Date().toISOString());
        // 🔒 DEDUPE: only one refresh at a time
        if (_refreshPromise) return _refreshPromise;

        _refreshPromise = (async () => {
          try {
            const res = await fetch(`/api/v1${API.AUTH_REFRESH}`, {
              method: "POST",
              credentials: "include",
            });

            if (!res.ok) {
              // refresh failed → user is not authenticated
              set({ user: null, token: null });
              return null;
            }

            // if (!res.ok) {
            //   console.warn("⚠️ Refresh failed, keeping user for now");
            //   return null;
            // }

            const data = await res.json();
            const token = data?.accessToken ?? data?.data?.accessToken;
            const user = data?.user ?? data?.data?.user;

            if (!token || !user) {
              set({ user: null, token: null });
              return null;
            }

            set({ user, token });
            return { user, token };
          } catch {
            set({ user: null, token: null });
            return null;
          } finally {
            _refreshPromise = null;
          }
        })();

        return _refreshPromise;
      },

      /* ================= LOGOUT ================= */

      logout: async () => {
        try {
          await fetch(`/api/v1${API.AUTH_SIGNOUT}`, {
            method: "POST",
            credentials: "include",
          });
        } catch {
          // ignore network error
        } finally {
          set({ user: null, token: null });
          window.location.href = "/signin";
        }
      },
    }),
    {
      name: "StudyNest_auth",
      getStorage: () =>
        typeof window !== "undefined" ? localStorage : null,
    }
  )
);
