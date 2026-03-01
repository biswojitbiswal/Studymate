"use client";

import { ArrowRight, GraduationCap } from "lucide-react";

export default function CTASection() {
    return (
        <section className="lg:px-18 pb-14">
            
            <div className="mx-auto max-w-7xl px-4 lg:px-6">
                <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-4 lg:px-8 lg:py-6 text-center shadow-sm">
                    {/* subtle background accent */} 
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-linear-to-br from-blue-300/40 via-blue-200/30 to-indigo-300/40 blur-3xl"
                        />

                    </div>

                    {/* content */}
                    <div className="relative z-10 flex flex-col items-center gap-2 animate-fade-up">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow">
                            <GraduationCap className="h-7 w-7" />
                        </div>

                        <h2 className="md:text-3xl font-bold tracking-tight text-gray-900 text-xl">
                            Start Learning the <span className="text-blue-600">Smarter</span> Way
                        </h2>

                        <p className="max-w-xl text-xs lg:text-sm leading-relaxed text-gray-600">
                            Whether you’re a student looking to learn better or a tutor ready to
                            teach smarter, StudyNest gives you everything you need — all in one place.
                        </p>

                        {/* actions */}
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <a
                                href="/signup"
                                className=" inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 lg:px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 " >
                                Get Started Free
                                <ArrowRight className="h-4 w-4 hidden md:block" />
                            </a>

                            <a
                                href="/signup"
                                className=" inline-flex items-center gap-2 rounded-xl border px-4 lg:px-6 py-3 text-sm font-medium transition bg-blue-600 text-white hover:bg-white hover:text-blue-600">
                                Create an Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
