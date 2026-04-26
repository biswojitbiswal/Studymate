"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpenText, CheckCircle, MessageCircle, Users } from "lucide-react";
import { useClass } from "@/hooks/tutor/useClass";
import LoadingScreen from "@/components/common/LoadingScreen";
import { ClassProvider } from "./ClassContext";
import { useMemo } from "react";
import ClassLayoutSkeleton from "@/components/skeleton/tutor/ClassLayout";
import { useCreateGroup } from "@/hooks/public/useChat";


const tabs = [
    { name: "Overview", href: "overview", key: "overview" },
    { name: "Sessions", href: "session", key: "session" },
    // { name: "Attendance", href: "attendance" },
    { name: "Assignments", href: "assignments", key: "assignments" },
    { name: "Resources", href: "resources", key: "resources" },
    { name: "Students", href: "students", key: "students" },
];

const STATUS_BASE =
    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium border";


export const STATUS_STYLES = {
    PUBLISHED: "bg-green-50 border-green-200 text-green-700",
    ACTIVE: "bg-blue-50 border-blue-200 text-blue-700",
    DRAFT: "bg-yellow-50 border-yellow-200 text-yellow-700",
    COMPLETED: "bg-gray-50 border-gray-200 text-gray-700",
    ARCHIVED: "bg-red-50 border-red-200 text-red-700",
};


export default function ClassLayout({ children }) {
    const { id } = useParams();
    const pathname = usePathname();
    const router = useRouter()

    const { mutateAsync: createGroup } = useCreateGroup();

    const segments = useSelectedLayoutSegments();
    const section = segments[0] ?? "dashboard";

    const { data, isLoading } = useClass(id);
    const klass = data?.data;


    const contextValue = useMemo(() => ({
        klass,
        classId: id,
        isDraft: klass?.status === "DRAFT",
        isGroup: klass?.type === "GROUP",
    }), [klass, id]);


    const handleChat = async () => {
        try {
            const res = await createGroup({
                classId: klass.id
            });

            const conversationId = res?.data?.id;
            // console.log(conversationId, res);
            

            router.push(`/dashboard/tutor/chats/${conversationId}`);
        } catch (err) {
            console.error(err);
        }
    };


    if (isLoading) return <ClassLayoutSkeleton />;
    return (
        <ClassProvider value={contextValue}>
            <div className="space-y-4">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-xl text-white">
                    <div className="flex items-center gap-2">

                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg backdrop-blur-sm transition shrink-0 hover:cursor-pointer"
                        >
                            <ArrowLeft size={18} />
                            {/* <span className="text-sm font-medium">Back</span> */}
                        </button>

                        {/* Title + Description */}
                        <div className="flex flex-col min-w-0">
                            <div>
                                <h1 className="text-2xl font-semibold leading-tight truncate">
                                    {klass?.title || "Tuition Class"}
                                </h1>
                            </div>

                            <p className="text-sm opacity-90 truncate">
                                {`${klass?.subject?.name} | ${klass?.level?.name}`}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-3">

                    {/* LEFT SIDE (Badges) */}
                    <div className="flex flex-wrap gap-3">

                        {/* Class Type */}
                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                            <Users size={14} />
                            <span className="font-semibold">{klass?.type}</span>
                        </div>

                        {/* Status */}
                        <div
                            className={`${STATUS_BASE} ${STATUS_STYLES[klass?.status] ||
                                "bg-gray-50 border-gray-200 text-gray-700"
                                }`}
                        >
                            <CheckCircle size={14} />
                            <span className="font-semibold">{klass?.status}</span>
                        </div>

                        {/* Visibility */}
                        {/* <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                            <BookOpenText size={14} />
                            <span className="font-semibold">{klass?.visibility}</span>
                        </div> */}

                    </div>

                    {/* RIGHT SIDE (Chat Button) */}
                    {
                        klass.type === 'GROUP' && (<div className="flex items-center gap-2">

                            <button
                                onClick={handleChat}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition hover:cursor-pointer"
                            >
                                <MessageCircle size={14} />
                                <span>
                                    Group
                                </span>
                            </button>

                        </div>)
                    }

                </div>


                {/* Tabs */}
                <div className="border-b overflow-hidden">
                    <div className="flex gap-7 lg:gap-8 overflow-x-auto scrollbar-none -mb-px px-1">
                        {tabs.map((tab) => {
                            const href = `/dashboard/tutor/classes/${id}/${tab.href}`;
                            // const isActive = pathname === href || (tab.href === "" && pathname.endsWith(id));
                            const isActive = section === tab.key;

                            return (
                                <Link
                                    key={tab.name}
                                    href={href}
                                    className={cn(
                                        "whitespace-nowrap py-2 text-sm font-semibold border-b-2 transition-colors flex-shrink-0",
                                        isActive
                                            ? "text-blue-600 border-blue-600"
                                            : "text-gray-600 border-transparent hover:text-blue-600"
                                    )}
                                >
                                    {tab.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div>{children}</div>
            </div>
        </ClassProvider>
    );
}
