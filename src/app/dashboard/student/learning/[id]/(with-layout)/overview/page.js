"use client";

import {
    Calendar,
    Clock,
    Users,
    IndianRupee,
    Eye,
    Layers,
    EyeOff,
    X,
} from "lucide-react";
import { useEnrolledClassContext } from "../EnrolledClassContext";
import Image from "next/image";
import { useState } from "react";


const DAY_LABELS = {
    SUN: "Sun",
    MON: "Mon",
    TUE: "Tue",
    WED: "Wed",
    THU: "Thu",
    FRI: "Fri",
    SAT: "Sat",
};



export default function ClassOverviewPage() {
    const [preview, setPreview] = useState(null);
    const { klass } = useEnrolledClassContext();

    const format2Digit = (num) => {
        return String(num ?? 0).padStart(2, "0");
    };


    function formatTimeRange(startTime, durationMin) {
        if (!startTime || !durationMin) return null;

        const [h, m] = startTime.split(":").map(Number);

        const start = new Date();
        start.setHours(h, m, 0, 0);

        const end = new Date(start.getTime() + durationMin * 60 * 1000);

        const format = (date) =>
            date.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });

        return `${format(start)} – ${format(end)}`;
    }


    function formatDate(dateString) {
        if (!dateString) return "—";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }


    return (
        <div className="space-y-4">

            {/* Description + Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Schedule & Joining Window */}
                <div className="lg:col-span-2 bg-white border rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Schedule & Availability
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">

                        {/* Class Schedule */}
                        <div className="space-y-2">
                            <p className="font-medium text-gray-900">Class Schedule</p>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">📅</span>
                                {klass?.daysOfWeek?.length
                                    ? klass.daysOfWeek.map(d => DAY_LABELS[d]).join(", ")
                                    : "No schedule"}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">⏰</span>
                                <span className="text-gray-700">
                                    {klass?.startTime && klass?.durationMin
                                        ? formatTimeRange(klass.startTime, klass.durationMin)
                                        : "Time not set"}

                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">⏳</span>
                                Duration: {klass?.durationMin && `${klass?.durationMin} min`}
                            </div>
                        </div>

                        {/* Joining Window */}
                        <div className="space-y-2">
                            <p className="font-medium text-gray-900">Joining Window</p>
                            <div>
                                <span className="font-medium">Start:</span> {formatDate(klass?.joiningStartDate)}
                            </div>
                            <div>
                                <span className="font-medium">End:</span> {formatDate(klass?.joiningEndDate)}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="font-medium text-gray-900">Class Window</p>
                            <div>
                                <span className="font-medium">Start:</span> {formatDate(klass?.startDate)}
                            </div>
                            <div>
                                <span className="font-medium">End:</span> {formatDate(klass?.endDate)}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Class Preview */}
                <div className="bg-white border rounded-xl p-5">
                    {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Class Preview
                    </h2> */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Preview Image */}
                        <div
                            onClick={() =>
                                klass?.previewImg &&
                                setPreview({ type: "image", url: klass.previewImg })
                            }
                            className="relative h-44 w-full rounded-lg border bg-blue-50 overflow-hidden cursor-pointer hover:scale-[1.02] transition"
                        >

                            <span className="absolute top-2 left-2 z-10 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                Image
                            </span>

                            {klass?.previewImg ? (
                                <Image
                                    src={klass.previewImg}
                                    alt="Class preview image"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-blue-600 text-sm font-medium">
                                    No preview image
                                </div>
                            )}
                        </div>

                        {/* Preview Video */}
                        <div
                            onClick={() =>
                                klass?.previewVdo &&
                                setPreview({ type: "video", url: klass.previewVdo })
                            }
                            className="relative h-44 w-full rounded-lg border bg-blue-50 overflow-hidden cursor-pointer hover:scale-[1.02] transition"
                        >

                            <span className="absolute top-2 left-2 z-10 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                Video
                            </span>

                            {klass?.previewVdo ? (
                                <video
                                    src={klass.previewVdo}
                                    controls
                                    className="h-full w-full object-cover"
                                    preload="metadata"
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center text-blue-600">
                                    <p className="text-sm font-medium">Preview Video</p>
                                    <p className="text-xs opacity-70">No video uploaded</p>
                                </div>
                            )}
                        </div>


                    </div>
                    {preview && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                            {/* Close button */}
                            <button
                                onClick={() => setPreview(null)}
                                className="absolute top-6 right-6 text-white hover:scale-110 transition hover:cursor-pointer"
                            >
                                <X size={32} />
                            </button>

                            {/* Content */}
                            <div className="relative w-[90%] max-w-4xl max-h-[85vh]">

                                {preview.type === "image" ? (
                                    <Image
                                        src={preview.url}
                                        alt="Preview"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                                        unoptimized
                                    />
                                ) : (
                                    <video
                                        src={preview.url}
                                        controls
                                        autoPlay
                                        className="w-full max-h-[85vh] rounded-lg bg-black"
                                    />
                                )}

                            </div>
                        </div>
                    )}

                </div>

            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Users size={18} />}
                    label="Enrolled Students"
                    value={format2Digit(klass?.totalEnrollment)}
                />
                <StatCard
                    icon={<Layers size={18} />}
                    label="Capacity"
                    value={format2Digit(klass?.capacity)}
                />
                <StatCard
                    icon={<IndianRupee size={18} />}
                    label="Price"
                    value={`₹${klass?.price.toFixed(2)}`}
                />
                <StatCard
                    icon={klass?.visibility === 'PUBLIC' ? <Eye size={18} /> : <EyeOff size={18} />}
                    label="Visibility"
                    value={klass?.visibility}
                />
            </div>

            {/* Description */}
            <div className="bg-white border rounded-xl p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Class Description
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {klass?.description}
                </p>
            </div>




            {/* Syllabus */}
            <div className="bg-white border rounded-xl p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Syllabus
                </h2>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {
                        klass?.syllabus && klass?.syllabus.map((s, idx) => {
                            return <li key={idx}>{s}</li>
                        })
                    }
                </ul>
            </div>

        </div>
    );
}

/* ---------- Reusable Stat Card ---------- */

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-blue-600">
                    {value}
                </p>
            </div>
        </div>
    );
}
