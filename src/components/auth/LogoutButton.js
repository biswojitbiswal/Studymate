"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
    const router = useRouter();
    const logout = useAuthStore((s) => s.logout);
    const queryClient = useQueryClient();
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4040/api/v1'

    async function doLogout() {
        try {
            await fetch(`${BACKEND_URL}/auth/signout`, {
                method: "POST",
                credentials: "include",
            });

            queryClient.clear();

            // OR (more controlled way)
            // queryClient.removeQueries();
            // queryClient.invalidateQueries();
        } catch (e) { 
            console.log("Logout error:", e);
        }

        logout();
        router.push("/");
    }

    return (
        <button onClick={doLogout} className="text-md text-blue-600 hover:cursor-pointer">
            Logout
        </button>
    );
}
