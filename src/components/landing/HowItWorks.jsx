"use client"

import { useEffect, useState } from "react"
import { UserPlus, CalendarCheck, TrendingUp } from "lucide-react"

export default function HowItWorks() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % 2) // 0 → 1 → 0
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-white py-12 px-18">
      <div className="mx-auto max-w-7xl w-full">
        <div className="flex flex-col items-center gap-8">
          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              How <span className="text-blue-600">It Works</span>
            </h2>
            <p className="mt-4 text-base text-gray-600">Get started in just three simple steps.</p>
          </div>

          {/* STEPS */}
          <div className="relative w-full max-w-5xl">
            {/* CONNECTORS - Positioned exactly in the middle of icons */}
            <svg
              className="absolute left-0 top-7 w-full h-0.5 overflow-visible"
              viewBox="0 0 1000 2"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Base lines (gray) */}
              <line x1="200" y1="1" x2="500" y2="1" stroke="#e5e7eb" strokeWidth="2" />
              <line x1="500" y1="1" x2="800" y2="1" stroke="#e5e7eb" strokeWidth="2" />

              {/* Animated 1 → 2 */}
              {active === 0 && (
                <line
                  x1="200"
                  y1="1"
                  x2="500"
                  y2="1"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-lighting"
                  style={{
                    strokeDasharray: "100, 200",
                    filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))",
                  }}
                />
              )}

              {/* Animated 2 → 3 */}
              {active === 1 && (
                <line
                  x1="500"
                  y1="1"
                  x2="800"
                  y2="1"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-lighting"
                  style={{
                    strokeDasharray: "100, 200",
                    filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))",
                  }}
                />
              )}
            </svg>

            {/* STEP CONTENT */}
            <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
              <Step
                icon={UserPlus}
                title="Create Your Account"
                desc="Sign up as a student or tutor and set up your profile."
              />

              <Step
                icon={CalendarCheck}
                title="Join or Create Classes"
                desc="Enroll in classes or create sessions with smart scheduling."
              />

              <Step
                icon={TrendingUp}
                title="Learn & Track Progress"
                desc="Attend classes, collaborate, and track your learning growth."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Icon - h-14 (56px) so center is at 28px */}
      <div
        className="
          mb-6
          flex h-14 w-14 items-center justify-center
          rounded-full
          bg-blue-50
          text-blue-600
          shadow-sm
          transition-all
          duration-300
          group-hover:bg-blue-600
          group-hover:text-white
          group-hover:scale-110
          group-hover:shadow-blue-200/50
          group-hover:shadow-lg
        "
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>

      <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-gray-500">{desc}</p>
    </div>
  )
}
