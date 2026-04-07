"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const user = useAuthStore((s) => s.user);

  let href = "/signup";
  let label = "Become a Tutor";

  if (user) {
    if (user.role === "TUTOR") {
      href = "/dashboard/tutor";
      label = "Dashboard";
    } else if (user.role === "STUDENT") {
      href = "/tutor-apply";
      label = "Become a Tutor";
    } else if (user.role === "ADMIN") {
      href = "/dashboard/admin";
      label = "Dashboard";
    }
  }
  return (
    <section className="relative overflow-hidden lg:px-18 bg-white pt-26 md:pt-24 lg:pt-30 pb-10">

      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="space-y-4 lg:space-y-6">
            <span className="inline-flex items-center lg:px-2 text-md text-blue-600">
              Smart Learning Platform
            </span>

            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Smart Learning
              <br />
              <span className="text-blue-600">
                Seamless Teaching
              </span>
            </h1>

            <p className="max-w-xl text-lg text-gray-600">
              Connect with expert tutors, join interactive classes,
              and manage everything from scheduling to attendance —
              all in one powerful platform.
            </p>

            <div className="flex lg:flex-wrap gap-2 lg:gap-4">
              <Link href="/classes">
                <Button
                  size="lg"
                  className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Start Learning
                </Button>
              </Link>

              <Link href={href}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50 hover:cursor-pointer"
                >
                  {label}
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["10k+", "Students"],
                ["500+", "Tutors"],
                ["50k+", "Classes"],
                ["98%", "Satisfaction"],
              ].map(([value, label]) => (
                <div key={label} className="bg-blue-50 px-4 py-2 rounded-lg lg:bg-transparent">
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE – FLOATING PRODUCT CARDS */}
          <div className="relative hidden lg:block">
            <div className="relative h-[460px] w-full">

              {/* HERO ILLUSTRATION */}
              {/* <div className="absolute top-8 z-20 left-1/3 -translate-x-1/2 animate-float-slow">
                <Image
                  src="/Hero.png"
                  alt="Learning illustration"
                  width={480}
                  height={580}
                  priority
                  className="select-none"
                />
              </div> */}

              {/* Card 1 */}
              <div className="absolute left-2 top-14 z-10 w-64 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg animate-float">
                <p className="font-semibold text-blue-600">Live Class</p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 w-full rounded bg-blue-100" />
                  <div className="h-2 w-3/4 rounded bg-blue-100" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute right-2 top-45 z-10 w-64 rounded-2xl border border-indigo-100 bg-white p-4 shadow-lg animate-float-slow">
                <p className="font-semibold text-indigo-600">
                  Mentored Group Study
                </p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 w-full rounded bg-indigo-100" />
                  <div className="h-2 w-2/3 rounded bg-indigo-100" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute bottom-16 left-24 z-10 w-64 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg animate-float-slow">
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
      {/* <style jsx>{`
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
      `}</style> */}
    </section>
  );
}
