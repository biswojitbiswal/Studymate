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
        if (!user) {
            router.replace("/signin");
        } else if (
            user.role === "STUDENT" &&
            user.signupIntent === "TUTOR"
        ) {
            router.replace("/tutor-apply");
        }
    }, [user, router]);

    if (
        !user ||
        (user.role === "STUDENT" && user.signupIntent === "TUTOR")
    ) return null;

    return (
        <>
            <AppNavbar />
            <main className="pt-20">{children}</main>
            <Footer />
        </>
    );
}
