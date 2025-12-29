"use client";

import {
    Calendar,
    Clock,
    Users,
    IndianRupee,
    Eye,
    Layers,
} from "lucide-react";

export default function ClassOverviewPage() {
    return (
        <div className="space-y-6">

            {/* Description + Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Description */}
                <div className="lg:col-span-2 bg-white border rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        Class Description
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This course covers algebra, geometry, and trigonometry concepts
                        to prepare students for exams with interactive group sessions
                        and problem-solving activities.
                    </p>
                </div>

                {/* Preview */}
                {/* Class Preview */}
                <div className="bg-white border rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Class Preview
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Preview Image */}
                        <div className="relative h-44 rounded-lg border bg-blue-50 flex flex-col items-center justify-center">
                            <span className="absolute top-2 left-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                Image
                            </span>
                            <p className="text-blue-600 text-sm font-medium">
                                Preview Image
                            </p>
                        </div>

                        {/* Preview Video */}
                        <div className="relative h-44 rounded-lg border bg-blue-50 flex flex-col items-center justify-center">
                            <span className="absolute top-2 left-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                Video
                            </span>
                            <p className="text-blue-600 text-sm font-medium">
                                Preview Video
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Users size={18} />}
                    label="Enrolled Students"
                    value="24"
                />
                <StatCard
                    icon={<Layers size={18} />}
                    label="Capacity"
                    value="30"
                />
                <StatCard
                    icon={<IndianRupee size={18} />}
                    label="Price"
                    value="₹999"
                />
                <StatCard
                    icon={<Eye size={18} />}
                    label="Visibility"
                    value="Public"
                />
            </div>

            {/* Schedule & Joining Window */}
            <div className="bg-white border rounded-xl p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Schedule & Availability
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">

                    {/* Class Schedule */}
                    <div className="space-y-2">
                        <p className="font-medium text-gray-900">Class Schedule</p>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600">📅</span>
                            Mon, Wed, Fri
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600">⏰</span>
                            4:00 PM – 5:00 PM
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600">⏳</span>
                            Duration: 60 mins
                        </div>
                    </div>

                    {/* Joining Window */}
                    <div className="space-y-2">
                        <p className="font-medium text-gray-900">Joining Window</p>
                        <div>
                            <span className="font-medium">Start:</span> 1 May 2024
                        </div>
                        <div>
                            <span className="font-medium">End:</span> 20 May 2024
                        </div>
                    </div>

                </div>
            </div>


            {/* Syllabus */}
            <div className="bg-white border rounded-xl p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Syllabus
                </h2>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Algebra & Linear Equations</li>
                    <li>Quadratic Equations</li>
                    <li>Trigonometry</li>
                    <li>Geometry Basics</li>
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
                <p className="text-sm font-semibold text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );
}
