"use client";

import {
    ShieldCheck,
    Award,
    UserCheck,
    Star,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth";

const VERIFIED_POINTS = [
    {
        title: "Identity Verified",
        desc: "Tutors are verified to ensure authenticity and a safe learning environment.",
        icon: ShieldCheck,
    },
    {
        title: "Qualified & Experienced",
        desc: "Teaching background and subject expertise are carefully reviewed.",
        icon: Award,
    },
    {
        title: "Platform Approved",
        desc: "Only approved tutors can create classes and teach on StudyNest.",
        icon: UserCheck,
    },
    {
        title: "Quality Monitored",
        desc: "Continuous feedback helps maintain high teaching standards.",
        icon: Star,
    },
];

export default function VerifiedTutorsSection() {
    const user = useAuthStore((s) => s.user);

    let href = "/signup";
    let label = "Apply to Tutor";

    if (user) {
        if (user.role === "TUTOR") {
            href = "/dashboard/tutor";
            label = "Dashboard";
        } else if (user.role === "STUDENT") {
            href = "/tutor-apply";
            label = "Apply to Tutor";
        } else if (user.role === "ADMIN") {
            href = "/dashboard/admin";
            label = "Dashboard";
        }
    }
    return (
        <section className="py-10">
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Learn from <span className="text-blue-600">Verified Tutors</span>
                    </h2>
                    <p className="mt-4 text-xs lg:text-sm text-gray-600">
                        Every tutor on StudyNest goes through a verification process to
                        ensure quality, expertise, and trusted learning.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {VERIFIED_POINTS.map((point, index) => (
                        <Card
                            key={index}
                            className="border-none shadow-sm hover:shadow-md transition"
                        >
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                                    <point.icon className="h-6 w-6 text-blue-600" />
                                </div>

                                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                    {point.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    {point.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-10 flex gap-4 text-center justify-center">
                    <Link href="/classes">
                        <Button size="lg" className="rounded-lg bg-blue-600 hover:cursor-pointer">
                            Explore Classes
                        </Button>
                    </Link>

                    <Link href={href}>
                        <Button
                            size="lg"
                            // variant="outline"
                            className="rounded-xl bg-blue-600 hover:bg-blue-800 hover:cursor-pointer"
                        >
                            {label}
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
