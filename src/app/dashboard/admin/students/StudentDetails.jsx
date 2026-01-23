"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Mail,
  GraduationCap,
  BookOpen,
  Languages,
  ShieldCheck,
  ShieldX,
  CalendarDays,
  Phone,
} from "lucide-react";

import Image from "next/image";

export default function StudentDetailsModal({
  open,
  onClose,
  student,
}) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90%] rounded-2xl p-0 overflow-hidden">
        {/* ---------- HEADER ---------- */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-lg mb-2">
              Student Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4">
            <Image
              src={student.avatar || "/avatar.png"}
              alt="Student Profile"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border-2 border-white object-cover"
            />

            <div>
              <h2 className="text-lg font-semibold">
                {student.name}
              </h2>

              <div className="flex gap-2 mt-2">
                {student.isActive ? (
                  <Badge className="bg-green-500">
                    ACTIVE
                  </Badge>
                ) : (
                  <Badge className="bg-red-500">
                    INACTIVE
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* CONTACT */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Contact Information
            </h3>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-blue-600" />
              {student.email || "N/A"}
            </div>

            <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                {student?.phone || "N/A"}
              </div>
          </section>

          <Separator />

          {/* ACADEMIC INFO */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Academic Information
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <Stat
                icon={BookOpen}
                label="Board"
                value={student.board || "—"}
              />
              <Stat
                icon={GraduationCap}
                label="Level"
                value={student.level || "—"}
              />
              <Stat
                icon={Languages}
                label="Language"
                value={student.language || "—"}
              />
            </div>
          </section>

          <Separator />

          {/* SUBJECTS */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Subjects
            </h3>

            <div className="flex flex-wrap gap-2">
              {student.subjects?.length > 0 ? (
                student.subjects.map((s, i) => (
                  <Badge className="bg-blue-600 hover:bg-blue-800 hover:cursor-pointer" key={i}>{s}</Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No subjects selected
                </span>
              )}
            </div>
          </section>

          <Separator />

          {/* ACCOUNT STATUS */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Account Status
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <StatusRow
                label="Email Verified"
                value={student.isEmailVerified}
              />
              <StatusRow
                label="Profile Completed"
                value={student.profileCompleted}
              />
            </div>
          </section>

          <Separator />

          {/* META */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Meta Information
            </h3>

            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              Joined on{" "}
              {new Date(student.createdAt).toLocaleDateString()}
            </div>
          </section>
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="p-4 border-t flex justify-end">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="border rounded-xl p-4 flex items-center gap-3">
      <Icon className="h-6 w-6 text-blue-600" />
      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>
        <p className="font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      {value ? (
        <ShieldCheck className="h-4 w-4 text-green-600" />
      ) : (
        <ShieldX className="h-4 w-4 text-red-600" />
      )}
      <span>{label}</span>
    </div>
  );
}
