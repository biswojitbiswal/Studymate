"use client";

import Link from "next/link";
import { Users, MessageCircle, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GROUP_FEATURES = [
  {
    title: "Subject-Based Groups",
    desc: "Join groups focused on your subject, level, and learning goals.",
    icon: BookOpen,
  },
  {
    title: "Mentor-Guided Discussions",
    desc: "Tutors and monitors guide conversations to keep learning on track.",
    icon: Users,
  },
  {
    title: "Collaborative Learning",
    desc: "Discuss doubts, share resources, and study together anytime.",
    icon: MessageCircle,
  },
];

export default function GroupStudySection() {
  return (
    <section className="py-4 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900">
            Mentored <span className="text-blue-600">Group Study</span> Rooms
          </h2>
          <p className="mt-4 text-gray-600">
            Learn better together by joining guided study groups designed for
            collaboration, discussion, and focused learning.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GROUP_FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-sm hover:shadow-md transition"
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link href="/groups">
            <Button size="lg" className="rounded-full border border-blue-600 bg-blue-600 px-8 hover:text-blue-600 hover:bg-white hover:cursor-pointer">
              Explore Study Groups
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
