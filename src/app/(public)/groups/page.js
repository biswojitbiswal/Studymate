"use client";

import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const GROUPS = [
  {
    title: "Math Mastery Group",
    meta: "Class 10 • CBSE • English",
    members: 12,
    tutor: "Ms. Sharma",
    type: "FREE",
  },
  {
    title: "NEET Biology Prep",
    meta: "NEET • Science • Hindi",
    members: 24,
    tutor: "Dr. Verma",
    type: "PAID",
  },
  {
    title: "JEE Physics Experts",
    meta: "IIT JEE • Physics • English",
    members: 18,
    tutor: "Prof. Sen",
    type: "PAID",
  },
];

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-30 px-22">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Group Study Rooms
          </h1>
          <p className="mt-2 text-gray-600">
            Find and join study groups that match your subject, level, and goals.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Input placeholder="Search groups..." className="max-w-xs" />
          <Button variant="outline">Subject</Button>
          <Button variant="outline">Level</Button>
          <Button variant="outline">Board</Button>
          <Button variant="outline">Language</Button>
        </div>

        {/* Group List */}
        <div className="space-y-4">
          {GROUPS.map((group, i) => (
            <Card
              key={i}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left */}
              <div>
                <h3 className="text-lg font-semibold text-blue-600">
                  {group.title}
                </h3>
                <p className="text-sm text-gray-600">{group.meta}</p>

                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {group.members} students
                  </span>
                  <span>Tutor: {group.tutor}</span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <Badge
                  className={
                    group.type === "FREE"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {group.type}
                </Badge>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Join Group
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center gap-2">
          <Button variant="outline">Prev</Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}
