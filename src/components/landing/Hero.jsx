"use client";

import { Button } from "@/components/ui/button";
import WorkflowDiagram from "./WorkFlowCard";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-18 bg-white pt-30 pb-10">

      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <span className="inline-flex items-center px-4 text-md text-blue-600">
              Smart Learning Platform
            </span>

            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Smart Learning.
              <br />
              <span className="text-blue-600">
                Seamless Teaching.
              </span>
            </h1>

            <p className="max-w-xl text-lg text-gray-600">
              Connect with expert tutors, join interactive classes,
              and manage everything from scheduling to attendance —
              all in one powerful platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
              >
                Start Learning
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50 hover:cursor-pointer"
              >
                Become a Tutor
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["10k+", "Students"],
                ["500+", "Tutors"],
                ["50k+", "Classes"],
                ["98%", "Satisfaction"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE – FLOATING PRODUCT CARDS */}
          <div className="relative hidden lg:block">
            <div className="relative h-[460px] w-full">

              {/* Card 1 */}
              <div className="absolute left-6 top-6 w-64 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg animate-float">
                <p className="font-semibold text-blue-600">Live Class</p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 w-full rounded bg-blue-100" />
                  <div className="h-2 w-3/4 rounded bg-blue-100" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute right-6 top-42 w-64 rounded-2xl border border-indigo-100 bg-white p-4 shadow-lg animate-float-delayed">
                <p className="font-semibold text-indigo-600">Mentored Group Study</p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 w-full rounded bg-indigo-100" />
                  <div className="h-2 w-2/3 rounded bg-indigo-100" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute bottom-8 left-24 w-64 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg animate-float-slow">
                <p className="font-semibold text-blue-600">Study Resource</p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 w-full rounded bg-blue-100" />
                  <div className="h-2 w-1/2 rounded bg-blue-100" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-float-slow {
          animation: float 9s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
