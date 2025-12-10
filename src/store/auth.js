// src/store/auth.js
import {create} from "zustand";
import { persist } from "zustand/middleware";
import { API } from "@/lib/endpoint";

/* helpers used by api-client */
export function getAuthToken() {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("studymate_auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch (e) {
    return null;
  }
}

export function storeLogout() {
  try {
    const s = useAuthStore.getState();
    if (s?.logout) s.logout();
  } catch (e) {}
}

/* IMPORTANT: helper to let api-client update token after refresh */
export function setAuthToken(token) {
  try {
    useAuthStore.setState({ token });
  } catch (e) {}
}

/* main zustand store */
export const useAuthStore = create(
  persist(
    (set, get) => {
      return {
        user: null,
        token: null,

        login: async (email, password, role) => {
          const res = await fetch(API.AUTH_SIGNIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // ensure cookies handled if backend sets them cross-origin
            body: JSON.stringify({ email, password, role }),
          });

          const data = await res.json();

          if (!res.ok) {
            const message = data?.message || data?.error || "Signin failed";
            const err = new Error(message);
            err.status = res.status;
            throw err;
          }

          const token = data.accessToken ?? data.token;
          const user = data.user ?? null;
          if (!token || !user) {
            throw new Error("Invalid signin response from server");
          }

          set({ user, token });
          return { user, token };
        },

        signup: async (payload) => {
          const res = await fetch(API.AUTH_SIGNUP, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });

          const data = await res.json();
          if (!res.ok) {
            const message = data?.message || data?.error || "Signup failed";
            const err = new Error(message);
            err.status = res.status;
            throw err;
          }
          return data;
        },

        logout: () => {
          set({ user: null, token: null });
        },
      };
    },
    {
      name: "studymate_auth",
      getStorage: () => (typeof window !== "undefined" ? localStorage : null),
    }
  )
);
