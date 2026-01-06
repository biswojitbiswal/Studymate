"use client";

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
    MessageCircle
} from "lucide-react";
import { useState } from "react";

export default function ClassDetailsPage() {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="min-h-screen px-22 py-36 bg-linear-to-b from-gray-50 to-white">
            {/* Header Section */}
            <div className="relative bg-white overflow-hidden">
                {/* Subtle Background Accent */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-50 to-transparent rounded-md"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Left: Class Info */}
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium text-blue-700">
                                <Video className="w-4 h-4" />
                                Live Group Class
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                                Class 10 Mathematics – Live Batch
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4 text-blue-600" />
                                    Mathematics
                                </span>
                                <span>•</span>
                                <span>Class 10</span>
                                <span>•</span>
                                <span>CBSE Board</span>
                                <span>•</span>
                                <span>English</span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 text-lg leading-relaxed">
                                A structured live class designed to help students master
                                core concepts with regular practice, doubt solving, and mentor guidance.
                            </p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                                        <Users className="w-4 h-4" />
                                        Students
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">80+</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                                        <Clock className="w-4 h-4" />
                                        Duration
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">3 Months</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                                        <Star className="w-4 h-4" />
                                        Rating
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                                </div>
                            </div>

                            
                        </div>

                        {/* Right: Video Preview */}
                        <div className="lg:pt-8">
                            <div className="relative group flex flex-col justify-between gap-8">
                                {/* Preview Container */}
                                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl border-2 border-blue-200">
                                    <img
                                        src="/Hero.png"
                                        alt="Class Preview"
                                        className="w-full h-64 object-cover"
                                    />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors cursor-pointer">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                                            <Play className="w-10 h-10 text-blue-600 ml-1" />
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium">
                                        Preview • 2:30
                                    </div>
                                </div>

                                {/* Tutor Card */}
                            <div className="bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
                                <p className="text-blue-600 text-xs uppercase tracking-wide font-semibold mb-3">Your Instructor</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                        AK
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Anil Kumar</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-700 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Award className="w-4 h-4 text-blue-600" />
                                                8+ years
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                4.8 rating
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-4 h-4 text-blue-600" />
                                                2000+ students
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-[1fr_380px] gap-10">
                    {/* Left Content */}
                    <div className="space-y-10">

                        {/* What You'll Learn */}
                        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">What You'll Learn</h2>
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
                                    <div key={index} className="flex items-start gap-3 group">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* About This Class */}
                        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">About This Class</h2>
                            </div>

                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    This comprehensive Class 10 Mathematics course is designed to help students build a solid foundation in mathematical concepts while preparing them for board examinations. Our expert instructor uses a blend of theoretical explanations and practical problem-solving approaches.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    The course includes live interactive sessions, weekly assignments, doubt-clearing sessions, and regular mock tests to ensure students are well-prepared and confident.
                                </p>
                            </div>
                        </section>

                        {/* Schedule & Timing */}
                        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Schedule & Timing</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <MetaCard icon={Calendar} label="Class Days" value="Mon · Wed · Fri" />
                                <MetaCard icon={Clock} label="Timing" value="6:00 PM – 7:30 PM IST" />
                                <MetaCard icon={Calendar} label="Duration" value="3 Months (36 Sessions)" />
                                <MetaCard icon={Users} label="Batch Size" value="Max 30 Students" />
                            </div>
                        </section>

                        {/* Tutor Details */}
                        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Meet Your Instructor</h2>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                                        AK
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Anil Kumar</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                            <span className="flex items-center gap-1.5">
                                                <Award className="w-4 h-4 text-blue-600" />
                                                8+ years experience
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                4.8 rating (500+ reviews)
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4 text-blue-600" />
                                                2000+ students taught
                                            </span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            Experienced Mathematics educator specializing in CBSE curriculum with a proven track record of helping students achieve excellent results. Known for making complex concepts simple and engaging.
                                        </p>
                                    </div>
                                </div>

                                {/* Tutor Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">95%</p>
                                        <p className="text-xs text-gray-600 mt-1">Success Rate</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">500+</p>
                                        <p className="text-xs text-gray-600 mt-1">Reviews</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">2000+</p>
                                        <p className="text-xs text-gray-600 mt-1">Students</p>
                                    </div>
                                </div>

                                {/* Contact Button */}
                                <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    Contact Instructor
                                </button>
                            </div>
                        </section>

                        {/* Syllabus - Last Section */}
                        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Course Syllabus</h2>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { title: "Real Numbers", lessons: "8 lessons" },
                                    { title: "Polynomials", lessons: "6 lessons" },
                                    { title: "Pair of Linear Equations in Two Variables", lessons: "7 lessons" },
                                    { title: "Quadratic Equations", lessons: "9 lessons" },
                                    { title: "Arithmetic Progressions", lessons: "5 lessons" },
                                    { title: "Triangles", lessons: "8 lessons" },
                                    { title: "Coordinate Geometry", lessons: "6 lessons" },
                                    { title: "Introduction to Trigonometry", lessons: "10 lessons" },
                                    { title: "Statistics & Probability", lessons: "7 lessons" },
                                ].map((topic, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm transition-colors">
                                                {index + 1}
                                            </div>
                                            <span className="font-medium text-gray-900">{topic.title}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{topic.lessons}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar - Sticky Enrollment Card */}
                    <aside className="lg:sticky lg:top-6 h-fit">
                        <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-lg overflow-hidden">
                            {/* Price Header with Gradient */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                <p className="text-blue-100 text-sm mb-2">Course Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">₹1,999</span>
                                    <span className="text-blue-100 line-through text-lg">₹4,999</span>
                                </div>
                                <p className="text-blue-100 text-sm mt-2">60% OFF - Limited Time</p>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Enrollment Window */}
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                    <p className="text-amber-900 font-semibold text-sm mb-1">⏰ Enrollment Closing Soon</p>
                                    <p className="text-amber-700 text-sm">Join by 15th August</p>
                                </div>

                                {/* What's Included */}
                                <div className="space-y-3">
                                    <p className="font-semibold text-gray-900 text-sm">This course includes:</p>
                                    {[
                                        "36 live sessions",
                                        "Recorded videos",
                                        "Study materials",
                                        "Weekly assignments",
                                        "Doubt clearing",
                                        "Certificate on completion",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="space-y-3">
                                    <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105">
                                        Enroll Now
                                    </button>

                                    <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold transition-all ${isWishlisted
                                                ? 'border-red-500 text-red-600 bg-red-50'
                                                : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                                        {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                                    </button>
                                </div>

                                {/* Money Back Guarantee */}
                                <div className="text-center pt-4 border-t">
                                    <p className="text-xs text-gray-500">🔒 Secure payment · 7-day money back guarantee</p>
                                </div>
                            </div>
                        </div>

                        {/* Share Card */}
                        <div className="mt-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                            <p className="text-sm font-medium text-gray-900 mb-3">Share this course</p>
                            <div className="flex gap-2">
                                {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((platform) => (
                                    <button
                                        key={platform}
                                        className="flex-1 py-2 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                    >
                                        <span className="text-xs text-gray-600 capitalize">{platform[0].toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

/* Helper Components */
function MetaCard({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
}