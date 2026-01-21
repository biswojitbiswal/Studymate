"use client";

import Footer from "@/components/common/Footer";
import AppNavbar from "@/components/layout/app/AppNavbar";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
    const user = useAuthStore((s) => s.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) router.replace("/signin");
    }, [user]);

    if (!user) return null;

    return (
        <>
            <AppNavbar />
            <main className="pt-20">{children}</main>
            <Footer />
        </>
    );
}
