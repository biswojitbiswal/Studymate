"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import CommonProfile from "./CommonProfile";
import StudentProfile from "./StudentProfile";
import TutorProfile from "./TutorProfile";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  // 🔑 shared user-level state
  const [common, setCommon] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || null,
    avatarPreview: user?.avatar || null,
  });

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-xl font-semibold text-gray-900">
          My Profile
        </h1>
      </div>

      <CommonProfile common={common} setCommon={setCommon} />

      {user.role === "STUDENT" && (
        <StudentProfile common={common} />
      )}

      {user.role === "TUTOR" && (
        <TutorProfile common={common} />
      )}
    </div>
  );
}
