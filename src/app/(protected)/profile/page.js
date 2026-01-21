"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import CommonProfile from "./CommonProfile";
import StudentProfile from "./StudentProfile";
import TutorProfile from "./TutorProfile";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
console.log(user);

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
