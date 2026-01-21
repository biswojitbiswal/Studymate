"use client";

import { ArrowRight, Play, FileText, BookOpen } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const CLASSES = [
  {
    title: "Class 10 Mathematics",
    subtitle: "Live Session",
    tutor: "Mr. Anil Kumar",
    badge: "Popular",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    title: "Web Development Bootcamp",
    subtitle: "Coding Course",
    tutor: "Sarah Lee",
    badge: "New",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Physics Doubt Solving",
    subtitle: "Group Study",
    tutor: "Dr. Mehta",
    gradient: "from-green-600 to-emerald-500",
  },
];

const RESOURCES = [
  {
    title: "Algebra Formula Sheet",
    type: "PDF Document",
    subject: "Mathematics",
    icon: FileText,
    gradient: "from-blue-500 to-sky-500",
  },
  {
    title: "Photosynthesis Lecture",
    type: "Video Lesson",
    subject: "Biology",
    icon: Play,
    gradient: "from-green-500 to-lime-500",
  },
  {
    title: "Grammar Practice Pack",
    type: "Study Notes",
    subject: "English",
    icon: BookOpen,
    gradient: "from-orange-500 to-amber-500",
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function ExploreClassesResources() {
  return (
    <section className="px-18 pt-8">
      <div className="mx-auto max-w-7xl px-6 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore <span className="text-blue-600">Classes & Resources</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm text-gray-600">
            A glimpse of what you can learn and access on StudyNest.
          </p>
        </div>

        {/* FEATURED CLASSES */}
        <div className="space-y-3">
          <SectionHeader title="Featured Classes" link="View All Classes" />

          <div className="grid gap-6 md:grid-cols-3">
            {CLASSES.map((item) => (
              <ClassCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* POPULAR RESOURCES */}
        <div className="space-y-3">
          <SectionHeader title="Popular Resources" link="View All Resources" />

          <div className="grid gap-6 md:grid-cols-3">
            {RESOURCES.map((item) => (
              <ResourceCard key={item.title} {...item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function SectionHeader({ title, link }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <a
        href="#"
        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
      >
        {link}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function ClassCard({ title, subtitle, tutor, badge, gradient }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        p-5
        text-white
        shadow-lg
        transition
        hover:-translate-y-1
        hover:shadow-xl
        bg-linear-to-br ${gradient}
      `}
    >
      {badge && (
        <span className="absolute right-4 top-4 rounded bg-white/20 px-3 py-1 text-xs font-semibold">
          {badge}
        </span>
      )}

      <div className="space-y-2">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm opacity-90">
        <span className="h-6 w-6 rounded-full bg-white/30 flex items-center justify-center text-xs">
          👤
        </span>
        {tutor}
      </div>
    </div>
  );
}

function ResourceCard({ title, type, subject, icon: Icon, gradient }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        p-5
        text-white
        shadow-lg
        transition
        hover:-translate-y-1
        hover:shadow-xl
        bg-linear-to-br ${gradient}
      `}
    >
      <div className="flex items-center justify-between">
        <Icon className="h-8 w-8 opacity-90" />
        <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">
          {type}
        </span>
      </div>

      <div className="mt-6 space-y-1">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-sm opacity-90">{subject}</p>
      </div>
    </div>
  );
}
