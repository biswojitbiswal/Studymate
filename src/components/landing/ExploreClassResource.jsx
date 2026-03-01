"use client";

import { ArrowRight, Play, FileText, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    <section className="lg:px-18 pt-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 space-y-6">

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore <span className="text-blue-600">Classes & Resources</span>
          </h2>
          <p className="max-w-xl mx-auto text-xs lg:text-sm text-gray-600">
            A glimpse of what you can learn and access on StudyNest.
          </p>
        </div>

        <div className="space-y-3">
          <SectionHeader title="Featured" link="View All" />

          <MobileCarousel items={CLASSES} />

          {/* Desktop Grid */}
          <div className="hidden md:grid gap-6 md:grid-cols-3">
            {CLASSES.map((item) => (
              <ClassCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* POPULAR RESOURCES */}
        {/* <div className="space-y-3">
          <SectionHeader title="Popular Resources" link="View All Resources" />

          <div className="grid gap-6 md:grid-cols-3">
            {RESOURCES.map((item) => (
              <ResourceCard key={item.title} {...item} />
            ))}
          </div>
        </div> */}

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
        href="/classes"
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
      {/* {badge && (
        <span className="absolute right-4 top-4 rounded bg-white/20 px-3 py-1 text-xs font-semibold">
          {badge}
        </span>
      )} */}

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


function MobileCarousel({ items }) {
  // Clone first & last
  const slides = [
    items[items.length - 1],
    ...items,
    items[0],
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle infinite reset
  useEffect(() => {
    if (activeIndex === slides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(1);
      }, 500);
    }

    if (activeIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(slides.length - 2);
      }, 500);
    }
  }, [activeIndex, slides.length]);

  // Re-enable transition after reset
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  return (
    <div className="md:hidden overflow-hidden">
      {/* Slides Wrapper */}
      <div
        className="flex"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease" : "none",
        }}
      >
        {slides.map((item, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0 px-2"
          >
            <ClassCard {...item} />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index + 1)}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeIndex === index + 1
                ? "w-6 bg-blue-600"
                : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}