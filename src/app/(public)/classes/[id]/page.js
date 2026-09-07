"use client";

import ClassDetailsSkeleton from "@/components/skeleton/ClassDetailsSkeleton";
import { useBrowseClass } from "@/hooks/public/useClass";
import { useToggleWishlist } from "@/hooks/public/useWishlist";
import { usePublishClass } from "@/hooks/tutor/useClass";
import { useAuthStore } from "@/store/auth";

import {
    Calendar,
    Clock,
    Users,
    Heart,
    Play,
    Award,
    BookOpen,
    Target,
    CheckCircle,
    Star,
    GraduationCap,
    Video,
    MessageCircle,
    ArrowRight,
    Share2,
    Copy,
    Check,
    Mail,
    MessageCircleMore,
} from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ClassDetailsPage() {
    const param = useParams();
    const router = useRouter();

    const user = useAuthStore((s) => s.user);

    const { data, isLoading } = useBrowseClass(param.id);
    const { mutate, isPending } = useToggleWishlist();


    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const shareRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(event.target)
            ) {
                setIsShareOpen(false);
            }
        };

        if (isShareOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShareOpen]);

    const shareUrl =
        typeof window !== "undefined"
            ? window.location.href
            : "";

    const shareText = `Check out this class: ${data?.data?.title || "Class"}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);

            setIsCopied(true);

            toast.success("Class link copied!");

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            toast.error("Failed to copy link");
        }
    };


    const handleWhatsAppShare = () => {
        const message = `${shareText}\n${shareUrl}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(message)}`,
            "_blank"
        );

        setIsShareOpen(false);
    };


    const handleTelegramShare = () => {
        window.open(
            `https://t.me/share/url?url=${encodeURIComponent(
                shareUrl
            )}&text=${encodeURIComponent(shareText)}`,
            "_blank"
        );

        setIsShareOpen(false);
    };


    const handleEmailShare = () => {
        const subject = data?.data?.title || "Check out this class";

        const body = `${shareText}\n\n${shareUrl}`;

        window.location.href =
            `mailto:?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        setIsShareOpen(false);
    };

    const handleNativeShare = async () => {
        if (!navigator.share) {
            toast.info("Your browser does not support native sharing");
            return;
        }

        try {
            await navigator.share({
                title: data?.data?.title || "Class",
                text: shareText,
                url: shareUrl,
            });

            setIsShareOpen(false);
        } catch (error) {
            // User cancelled share dialog.
            // Don't show an error in that case.
        }
    };

    // ==========================================
    // WISHLIST
    // ==========================================

    const toggleWishlist = (classId) => {
        mutate(classId, {
            onSuccess: (res) => {
                toast.success(res?.data?.data?.message);
            },

            onError: (err) => {
                toast.error(
                    err?.response?.data?.message ||
                    "Something went wrong"
                );
            },
        });
    };

    // ==========================================
    // FORMAT DURATION
    // ==========================================

    function formatDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        let diffMs = end - start;

        if (diffMs <= 0) return "—";

        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (months >= 1) {
            return `${months} month${months > 1 ? "s" : ""}`;
        }

        if (weeks >= 1) {
            return `${weeks} week${weeks > 1 ? "s" : ""}`;
        }

        if (days >= 1) {
            return `${days} day${days > 1 ? "s" : ""}`;
        }

        if (hours >= 1) {
            return `${hours} hour${hours > 1 ? "s" : ""}`;
        }

        return `${minutes} min`;
    }

    // ==========================================
    // FORMAT CLASS TIMING
    // ==========================================

    function formatClassTiming(startTime, durationMin) {
        if (!startTime || !durationMin) return "Flexible";

        const [hours, minutes] = startTime
            .split(":")
            .map(Number);

        if (isNaN(hours) || isNaN(minutes)) return "Flexible";

        const start = new Date();

        start.setHours(hours, minutes, 0, 0);

        const end = new Date(
            start.getTime() + durationMin * 60 * 1000
        );

        const formatter = new Intl.DateTimeFormat("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
        });

        return `${formatter.format(start)} – ${formatter.format(end)}`;
    }

    // ==========================================
    // FORMAT DATE
    // ==========================================

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {
        return <ClassDetailsSkeleton />;
    }

    return (
        <div className="min-h-screen px-4 lg:px-22 py-25 bg-linear-to-b from-gray-50 to-white relative">

            {/* Header Section */}

            <div className="relative bg-white overflow-hidden">

                {/* Subtle Background Accent */}

                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-100 to-transparent rounded-md"></div>

                <div className="relative max-w-7xl mx-auto px-2 lg:px-6 py-6">

                    <div className="grid lg:grid-cols-2 gap-4 items-start">

                        {/* Left: Class Info */}

                        <div className="space-y-3">

                            {/* ==========================================
                                BADGE + SHARE BUTTON
                            ========================================== */}

                            <div className="flex items-center gap-3">

                                {/* Existing Badge */}

                                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium text-blue-700">
                                    <Video className="w-4 h-4" />

                                    {data?.data?.type === "PRIVATE"
                                        ? "Private"
                                        : "Group"}{" "}
                                    Class
                                </div>

                                {/* ==========================================
                                    SHARE BUTTON
                                ========================================== */}

                                <div ref={shareRef} className="relative">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsShareOpen(
                                                (prev) => !prev
                                            )
                                        }
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-colors hover:cursor-pointer"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>

                                    {/* ==========================================
                                        SHARE POPOVER
                                    ========================================== */}

                                    {isShareOpen && (
                                        <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2">

                                            {/* Header */}

                                            <div className="px-3 py-2 border-b border-gray-100 mb-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Share this class
                                                </p>

                                                <p className="text-xs text-gray-500 mt-0.5 truncate">
                                                    {data?.data?.title}
                                                </p>
                                            </div>

                                            {/* Copy Link */}

                                            <button
                                                type="button"
                                                onClick={handleCopyLink}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                                            >
                                                {isCopied ? (
                                                    <Check className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <Copy className="w-4 h-4 text-gray-500" />
                                                )}

                                                <span>
                                                    {isCopied
                                                        ? "Copied!"
                                                        : "Copy link"}
                                                </span>
                                            </button>

                                            {/* WhatsApp */}

                                            <button
                                                type="button"
                                                onClick={
                                                    handleWhatsAppShare
                                                }
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-green-50 text-sm text-gray-700 transition-colors"
                                            >
                                                <MessageCircleMore className="w-4 h-4 text-green-600" />

                                                <span>
                                                    WhatsApp
                                                </span>
                                            </button>

                                            {/* Telegram */}

                                            <button
                                                type="button"
                                                onClick={
                                                    handleTelegramShare
                                                }
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-gray-700 transition-colors"
                                            >
                                                <MessageCircle className="w-4 h-4 text-blue-500" />

                                                <span>
                                                    Telegram
                                                </span>
                                            </button>

                                            {/* Email */}

                                            <button
                                                type="button"
                                                onClick={
                                                    handleEmailShare
                                                }
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                                            >
                                                <Mail className="w-4 h-4 text-gray-500" />

                                                <span>
                                                    Email
                                                </span>
                                            </button>

                                            {/* Native Share */}

                                            {"share" in navigator && (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleNativeShare
                                                    }
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                                                >
                                                    <Share2 className="w-4 h-4 text-gray-500" />

                                                    <span>
                                                        More...
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 🔥 Urgency message */}

                            {data?.data?.capacity -
                                data?.data?.totalEnrolment <=
                                0 ? (
                                <span className="px-2 text-xs text-red-600 font-semibold">
                                    🚫 Class Full
                                </span>
                            ) : data?.data?.capacity -
                                data?.data?.totalEnrolment >
                                0 &&
                                data?.data?.capacity -
                                data?.data?.totalEnrolment <=
                                3 ? (
                                <span className="px-2 text-xs text-orange-600 font-semibold">
                                    ⚡ Only{" "}
                                    {data?.data?.capacity -
                                        data?.data
                                            ?.totalEnrolment}{" "}
                                    seat
                                    {data?.data?.capacity -
                                        data?.data
                                            ?.totalEnrolment >
                                        1
                                        ? "s"
                                        : ""}{" "}
                                    left!
                                </span>
                            ) : null}

                            {/* Title */}

                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                                {data?.data?.title}
                            </h1>

                            {/* Meta Info */}

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">

                                <span className="flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4 text-blue-600" />

                                    {data?.data?.subject?.name}
                                </span>

                                {data?.data?.level?.name && (
                                    <>
                                        <span>•</span>
                                        <span>
                                            {data?.data?.level?.name}
                                        </span>
                                    </>
                                )}

                                {data?.data?.board?.name && (
                                    <>
                                        <span>•</span>
                                        <span>
                                            {data?.data?.board?.name}
                                        </span>
                                    </>
                                )}

                                {data?.data?.language?.name && (
                                    <>
                                        <span>•</span>
                                        <span>
                                            {data?.data?.language?.name}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Quick Stats */}

                            <div className="grid grid-cols-3 gap-4 pt-4">

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

                                    <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                                        <Users className="w-4 h-4" />
                                        Students
                                    </div>

                                    <p className="text-md lg:text-2xl font-bold text-gray-900">
                                        {
                                            data?.data?.tutor
                                                ?.totalStudents
                                        }+
                                    </p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

                                    <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                                        <Clock className="w-4 h-4" />
                                        Duration
                                    </div>

                                    <p className="text-md lg:text-2xl font-bold text-gray-900">
                                        {formatDuration(
                                            data?.data?.startDate,
                                            data?.data?.endDate
                                        )}
                                    </p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

                                    <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                                        <Star className="w-4 h-4" />
                                        Rating
                                    </div>

                                    <p className="text-md lg:text-2xl font-bold text-gray-900">
                                        {data?.data?.tutor?.rating}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Video Preview */}

                        <div className="">
                            <div className="relative group flex flex-col justify-between gap-8">

                                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl border-2 border-blue-200">

                                    <video
                                        src={data?.data?.previewVdo}
                                        className="w-full h-64 object-cover"
                                    />

                                    {/* Play Button Overlay */}

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors cursor-pointer">

                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">

                                            <Play className="w-10 h-10 text-blue-600 ml-1" />

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
                MAIN CONTENT
            ========================================================= */}

            <div className="max-w-7xl mx-auto py-4">

                <div className="grid lg:grid-cols-[1fr_380px] gap-10">

                    {/* Left Content */}

                    <div className="space-y-2 lg:space-y-4">

                        {/* What You'll Learn */}

                        <section className="bg-white rounded-md border border-gray-200 p-4 lg:p-8 shadow-sm">

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-blue-600" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900">
                                    What You'll Learn
                                </h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">

                                {[
                                    "Master fundamental concepts",
                                    "Solve complex problems",
                                    "Build strong foundations",
                                    "Exam preparation strategies",
                                    "Time management skills",
                                    "Regular assessments",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 group"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />

                                        <span className="text-gray-700">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* About This Class */}

                        <section className="bg-white rounded-md border border-gray-200 p-4 lg:p-8 shadow-sm">

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900">
                                    About This Class
                                </h2>
                            </div>

                            <div className="prose prose-gray max-w-none">

                                <p className="text-gray-700 leading-relaxed">
                                    {data?.data?.description}
                                </p>

                            </div>
                        </section>

                        {/* Schedule & Timing */}

                        <section className="bg-white rounded-md border border-gray-200 p-5">

                            <div className="flex items-center gap-2 mb-4">

                                <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                </div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Schedule & Timing
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                <MetaCard
                                    icon={Calendar}
                                    label="Class Days"
                                    value={
                                        Array.isArray(
                                            data?.data?.daysOfWeek
                                        )
                                            ? data.data.daysOfWeek.join(
                                                ", "
                                            )
                                            : "Flexible"
                                    }
                                />

                                <MetaCard
                                    icon={Clock}
                                    label="Timing"
                                    value={
                                        formatClassTiming(
                                            data?.data?.startTime,
                                            data?.data?.durationMin
                                        ) || "Flexible"
                                    }
                                />

                                <MetaCard
                                    icon={Calendar}
                                    label="Duration"
                                    value={formatDuration(
                                        data?.data?.startDate,
                                        data?.data?.endDate
                                    )}
                                />

                                <MetaCard
                                    icon={Users}
                                    label="Capacity"
                                    value={
                                        data?.data?.capacity || "—"
                                    }
                                />
                            </div>
                        </section>

                        {/* Tutor Details */}

                        <section className="bg-white rounded-md border border-gray-200 p-5">

                            <div className="flex items-center gap-2 mb-4">

                                <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center">
                                    <GraduationCap className="w-4 h-4 text-blue-600" />
                                </div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Meet Your Instructor
                                </h2>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">

                                <div className="flex items-start gap-4">

                                    <img
                                        src={
                                            data?.data?.tutor?.user
                                                ?.avatar
                                        }
                                        alt={
                                            data?.data?.tutor?.user
                                                ?.name
                                        }
                                        className="w-14 h-14 rounded-full shrink-0"
                                    />

                                    <div className="flex-1">

                                        <h3 className="text-base font-semibold text-gray-900">
                                            {
                                                data?.data?.tutor?.user
                                                    ?.name
                                            }
                                        </h3>

                                        <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1 mb-2">

                                            {data?.data?.tutor
                                                ?.yearsOfExp && (
                                                    <span className="flex items-center gap-1">

                                                        <Award className="w-3.5 h-3.5 text-blue-600" />

                                                        {
                                                            data.data.tutor
                                                                .yearsOfExp
                                                        }
                                                        + yrs
                                                    </span>
                                                )}

                                            <span className="flex items-center gap-1">

                                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />

                                                {
                                                    data?.data?.tutor
                                                        ?.rating
                                                }
                                            </span>

                                            <span className="flex items-center gap-1">

                                                <Users className="w-3.5 h-3.5 text-blue-600" />

                                                {
                                                    data?.data?.tutor
                                                        ?.totalStudents
                                                }{" "}
                                                students
                                            </span>
                                        </div>

                                        {data?.data?.tutor?.bio && (
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {
                                                    data.data.tutor
                                                        .bio
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">

                                    <div className="text-center">

                                        <p className="text-lg font-semibold text-blue-600">
                                            {
                                                data?.data?.tutor
                                                    ?.rating
                                            }
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Rating
                                        </p>
                                    </div>

                                    <div className="text-center">

                                        <p className="text-lg font-semibold text-blue-600">
                                            {
                                                data?.data?.tutor
                                                    ?.totalStudents
                                            }+
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Students
                                        </p>
                                    </div>
                                </div>

                                <button className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">

                                    <MessageCircle className="w-4 h-4" />

                                    Contact Instructor
                                </button>
                            </div>
                        </section>

                        {/* Syllabus */}

                        <section className="bg-white rounded-md border border-gray-200 p-5">

                            <div className="flex items-center gap-2 mb-4">

                                <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-blue-600" />
                                </div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Class Syllabus
                                </h2>
                            </div>

                            <div className="space-y-2">

                                {data?.data?.syllabus?.map(
                                    (title, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer"
                                        >
                                            <div className="w-7 h-7 bg-blue-50 rounded-md flex items-center justify-center text-blue-600 text-xs font-semibold shrink-0">
                                                {index + 1}
                                            </div>

                                            <span className="text-sm font-medium text-gray-900">
                                                {title}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar - Sticky Enrollment Card */}

                    <aside className="lg:sticky lg:top-6 h-fit">

                        <div className="bg-white rounded-md border-2 border-blue-100 shadow-lg overflow-hidden">

                            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">

                                <p className="text-blue-100 text-sm mb-2">
                                    Class Price
                                </p>

                                <div className="flex items-baseline gap-2">

                                    <span className="text-4xl font-bold">
                                        ₹
                                        {data?.data?.price.toFixed(
                                            2
                                        )}
                                    </span>

                                    <span className="text-blue-100 line-through text-lg">
                                        ₹
                                        {(
                                            data?.data?.price * 2
                                        ).toFixed(2)}
                                    </span>
                                </div>

                                <p className="text-blue-100 text-sm mt-2">
                                    50% OFF - Limited Time
                                </p>
                            </div>

                            <div className="p-6 space-y-6">

                                {data?.data
                                    ?.joiningStartDate &&
                                    data?.data
                                        ?.joiningEndDate && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">

                                            <p className="text-xs font-semibold text-amber-800 mb-1">
                                                Enrollment Period
                                            </p>

                                            <p className="text-sm text-amber-700">
                                                {formatDate(
                                                    data?.data
                                                        ?.joiningStartDate
                                                )}{" "}
                                                –{" "}
                                                {formatDate(
                                                    data?.data
                                                        ?.joiningEndDate
                                                )}
                                            </p>
                                        </div>
                                    )}

                                <div className="space-y-3">

                                    <p className="font-semibold text-gray-900 text-sm">
                                        This class includes:
                                    </p>

                                    {[
                                        "36 live sessions",
                                        "Recorded videos",
                                        "Study materials",
                                        "Weekly assignments",
                                        "Doubt clearing",
                                        "Certificate on completion",
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    disabled={
                                        !data?.data?.isPurchased &&
                                        data?.data
                                            ?.totalEnrolment >=
                                        data?.data?.capacity
                                    }
                                    onClick={() => {
                                        if (
                                            data?.data
                                                ?.isPurchased
                                        ) {
                                            router.push(
                                                `/dashboard/student/learning/${data?.data?.id}/overview`
                                            );
                                        } else if (
                                            data?.data
                                                ?.totalEnrolment <
                                            data?.data?.capacity
                                        ) {
                                            router.push(
                                                `/checkout/class/${data?.data?.id}`
                                            );
                                        }
                                    }}
                                    className={`w-full py-3.5
                                    text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30
                                    transition-all transform hover:scale-105
                                    ${!data?.data?.isPurchased &&
                                            data?.data
                                                ?.totalEnrolment >=
                                            data?.data?.capacity
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
                                        }`}
                                >
                                    {data?.data?.isPurchased
                                        ? "Go to Learning"
                                        : "Enroll Now"}
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Mobile Bottom Bar */}

            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t-2 border-gray-200 shadow-2xl z-500 p-4">

                <div className="flex gap-3 max-w-7xl mx-auto">

                    {/* Wishlist Button */}

                    <button
                        onClick={() =>
                            toggleWishlist(data?.data?.id)
                        }
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold transition-all hover:cursor-pointer border-gray-300 text-gray-700 active:border-blue-500 active:text-blue-600 active:bg-blue-50"
                    >
                        <Heart
                            className={`w-5 h-5 hover:text-red-600 ${data?.data?.isWishlisted
                                ? "fill-red-500 text-red-500"
                                : "text-blue-500"
                                }`}
                        />

                        <span className="hidden sm:inline">
                            {data?.data?.isWishlisted
                                ? "Saved"
                                : "Save"}
                        </span>
                    </button>

                    {/* Enroll Button */}

                    <button
                        onClick={() =>
                            router.push(
                                `/checkout/class/${data?.data?.id}`
                            )
                        }
                        className="flex-1 py-3 bg-gradient-to-r hover:cursor-pointer from-blue-600 to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                    >
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
}


// =========================================================
// META CARD
// =========================================================

function MetaCard({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">

            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-blue-600" />
            </div>

            <div>

                <p className="text-xs text-gray-500 leading-none mb-1">
                    {label}
                </p>

                <p className="text-sm font-medium text-gray-900">
                    {value}
                </p>

            </div>
        </div>
    );
}