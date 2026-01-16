"use client";

import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

export default function WhoIsStudyMateFor() {
  return (
    <section className="px-18">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8">

          {/* HEADER */}
          <div className="space-y-3 text-center animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Who Is <span className="text-blue-600">StudyNest</span> For?
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-gray-600">
              StudyNest is designed to support both sides of learning —
              helping students learn better and tutors teach smarter.
            </p>
          </div>

          {/* SPLIT CARDS */}
          <div className="grid w-full gap-8 lg:grid-cols-2">

            {/* STUDENTS */}
            <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  For Students
                </h3>
              </div>

              <ul className="space-y-4">
                <Benefit
                  icon={Users}
                  text="Learn together through mentored group study and focused discussions"
                />
                <Benefit
                  icon={BookOpen}
                  text="Access organized study resources, notes, and class materials anytime"
                />
                <Benefit
                  icon={BarChart3}
                  text="Track attendance, assignments, and learning progress in one place"
                />
              </ul>
            </div>

            {/* TUTORS */}
            <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  For Tutors
                </h3>
              </div>

              <ul className="space-y-4">
                <Benefit
                  icon={CalendarCheck}
                  text="Manage classes, schedules, and sessions without manual coordination"
                />
                <Benefit
                  icon={Users}
                  text="Engage students through structured group study and mentoring"
                />
                <Benefit
                  icon={BarChart3}
                  text="Monitor attendance, assignments, and student progress effortlessly"
                />
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SUB COMPONENT ---------------- */

function Benefit({ icon: Icon, text }) {
  return (
    <li className="flex items-start gap-3 transition">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm leading-relaxed text-gray-600">
        {text}
      </p>
    </li>
  );
}
