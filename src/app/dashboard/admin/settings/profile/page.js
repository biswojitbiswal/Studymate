"use client";

import CommonProfile from "@/app/(protected)/profile/CommonProfile";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateAdminProfile } from "@/hooks/public/useAuth";

export default function SettingsProfilePage() {
  const user = useAuthStore((s) => s.user);

  const [common, setCommon] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || null,
    avatarPreview: user?.avatar || null,
  });

  const { mutate, isPending } = useUpdateAdminProfile();

  if (!user) return null;
  

  const handleSubmit = () => {
    if (!common.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const fd = new FormData();

    fd.append("name", common.name);
    fd.append("email", common.email);
    fd.append("phone", common.phone);

    if (common.avatar) {
      fd.append("avatar", common.avatar);
    }

    mutate(
      {
        userId: user.id,   // 🔥 IMPORTANT
        data: fd,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully ✅");

          useAuthStore.setState((s) => ({
            ...s,
            user: {
              ...s.user,
              name: common.name,
              email: common.email,
              phone: common.phone,
              avatar: common.avatarPreview || s.user.avatar,
            },
          }));
        },
        onError: (e) => {
          toast.error(
            e?.response?.data?.message || "Update failed"
          );
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
      <CommonProfile common={common} setCommon={setCommon} />

      {/* ✅ Submit Button Added */}
      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
      >
        {isPending ? "Saving..." : "Save Profile"}
      </Button>
    </div>
  );
}