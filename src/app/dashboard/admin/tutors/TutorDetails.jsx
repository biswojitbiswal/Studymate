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
  Phone,
  Briefcase,
  Star,
  tutors,
  Link as LinkIcon,
  ShieldCheck,
  ShieldX,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

export default function TutorDetailsModal({
  open,
  onClose,
  tutor,
}) {
  if (!tutor) return null;



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[95%] rounded-2xl p-0 overflow-hidden">
        {/* ---------- HEADER ---------- */}
        <div className="bg-blue-600 text-white px-6 py-2">
          <DialogHeader>
            <DialogTitle className="text-lg mb-2">
              Tutor Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4">
            <Image
              src={tutor?.avatar || "/avatar.png"}
              alt="Tutor Profile"
              width={64}
              height={64}
              className="h-20 w-20 rounded-full border-2 border-white object-cover"
            />

            <div>
              <h2 className="text-lg font-semibold">
                {tutor?.name}
              </h2>
              <p className="text-sm opacity-90">
                {tutor?.title || "Tutor"}
              </p>

              <div className="flex gap-2 mt-2">
                <Badge className="bg-white text-blue-600">
                  {tutor?.tutorStatus}
                </Badge>

                {tutor?.isActive ? (
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

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Contact Information
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                {tutor?.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                {tutor?.phone || "N/A"}
              </div>
            </div>
          </section>

          <Separator />

          {/* ABOUT */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              About Tutor
            </h3>

            <p className="text-sm text-muted-foreground">
              {tutor?.bio || "No bio provided"}
            </p>
          </section>

          <Separator />

          {/* EXPERIENCE */}
          <section className="grid grid-cols-3 gap-4">
            <Stat
              icon={Briefcase}
              label="Experience"
              value={`${tutor?.yearsOfExp || 0} yrs`}
            />
            <Stat
              icon={Star}
              label="Rating"
              value={tutor?.rating || 0}
            />
            <Stat
              icon={GraduationCap}
              label="Students"
              value={tutor?.totalStudents || 0}
            />
          </section>

          <Separator />

          {/* QUALIFICATION */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Qualification
            </h3>

            <div className="flex flex-wrap gap-2">
              {tutor?.qualification.map((q, i) => (
                <Badge key={i} variant="secondary">
                  {q}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          {/* SUBJECTS & LEVELS */}
          <section className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-blue-600 font-semibold mb-3">
                Subjects
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor?.subjects.map((s, i) => (
                  <Badge className="bg-blue-600 hover:bg-blue-800 hover:cursor-pointer" key={i}>{s}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-blue-600 font-semibold mb-3">
                Levels
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor?.levels.map((l, i) => (
                  <Badge className="bg-blue-600 hover:bg-blue-800 hover:cursor-pointer" key={i}>
                    {l}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          <Separator />

          {/* DEMO LINKS */}
          <section>
            <h3 className="text-blue-600 font-semibold mb-3">
              Demo Links
            </h3>

            <div className="space-y-2">
              {tutor?.demoLinks.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No demo links provided
                </p>
              )}

              {tutor.demoLinks.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  className="flex items-center gap-2 text-blue-600 text-sm hover:underline"
                >
                  <LinkIcon className="h-4 w-4" />
                  {link}
                </a>
              ))}
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
                value={tutor?.isEmailVerified}
              />
              <StatusRow
                label="Profile Completed"
                value={tutor?.profileCompleted}
              />
            </div>
          </section>
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="p-4 border-t flex justify-end">
          <Button className="hover:cursor-pointer" onClick={onClose}>Close</Button>
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
