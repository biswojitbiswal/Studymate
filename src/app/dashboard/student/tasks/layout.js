"use client";

import { usePathname, useRouter } from "next/navigation";

export default function TasksLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const active =
        pathname.includes("/assigned") ? "ASSIGNED" : "PRIVATE";

    return (
        <div className="max-w-5xl mx-auto">
            <div className="border-b border-slate-200 mb-4">
                <div className="flex gap-12">
                    <button
                        onClick={() => router.push("/dashboard/student/tasks/my")}
                        className={`pb-2 text-sm font-medium transition ${active === "PRIVATE"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        My Tasks
                    </button>

                    <button
                        onClick={() =>
                            router.push("/dashboard/student/tasks/assigned")
                        }
                        className={`pb-2 text-sm font-medium transition ${active === "ASSIGNED"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        Assigned Tasks
                    </button>
                </div>
            </div>

            {children}
        </div>
    );
}
