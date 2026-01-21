import {
  Layers,
  Users,
  Zap,
  TrendingUp,
} from "lucide-react";

const BENEFITS = [
  {
    title: "Everything in One Place",
    desc: "Classes, group study, resources, tasks, and progress tracking — all organized in a single platform.",
    icon: Layers,
  },
  {
    title: "Better Engagement & Accountability",
    desc: "Guided tasks, mentored group study, and attendance tracking help students stay consistent and accountable beyond live classes.",
    icon: Users,
  },
  {
    title: "Less Manual Work for Tutors",
    desc: "Smart scheduling, task tracking, and automation reduce repetitive work so tutors can focus on teaching and mentoring.",
    icon: Zap,
  },
  {
    title: "Designed for Real Learning Progress",
    desc: "Track effort, measure progress, and improve consistently with connected learning workflows and tutor feedback.",
    icon: TrendingUp,
  },
];

export default function KeyBenefits() {
  return (
    <section className="px-18 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center gap-10">

          {/* HEADER */}
          <div className="space-y-4 text-center animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why <span className="text-blue-600">StudyNest</span> Works Better
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-gray-600">
              StudyNest isn’t just a collection of tools.
              It’s a thoughtfully connected learning system designed to make
              studying simpler, more engaging, and more effective for both
              students and tutors.
            </p>
          </div>

          {/* BENEFITS GRID */}
          <div className="grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="
                    group
                    relative
                    rounded-xl
                    border border-gray-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:shadow-md
                  "
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Icon */}
                  <div
                    className="
                      mb-4
                      flex h-10 w-10 items-center justify-center
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                      transition
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.desc}
                  </p>

                  {/* subtle hover glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute inset-0 rounded-xl ring-1 ring-blue-100" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
