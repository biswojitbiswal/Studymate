"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CommonProfile({ common, setCommon }) {
  const fileRef = useRef(null);
  

  const handleAvatarChange = (file) => {
    if (!file.type.startsWith("image/")) return;

    setCommon((prev) => ({
      ...prev,
      avatar: file,
      avatarPreview: URL.createObjectURL(file),
    }));
  };

  return (
    <Card className="text-center text-2xl rounded-sm">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div
            onClick={() => fileRef.current?.click()}
            className="h-24 w-24 rounded-full  border-3 border-blue-600 bg-slate-200 overflow-hidden cursor-pointer"
          >
            {common.avatarPreview ? (
              <img
                src={common.avatarPreview}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-xl">
                +
              </span>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleAvatarChange(e.target.files[0])
            }
          />
        </div>

        
        <Input
          placeholder="Full name"
          value={common.name}
          onChange={(e) =>
            setCommon((p) => ({ ...p, name: e.target.value }))
          }
        />

        <Input
          placeholder="Email"
          value={common.email}
          onChange={(e) =>
            setCommon((p) => ({ ...p, email: e.target.value }))
          }
        />

        <Input
          placeholder="Phone"
          value={common.phone}
          onChange={(e) =>
            setCommon((p) => ({ ...p, phone: e.target.value }))
          }
        />
      </CardContent>
    </Card>
  );
}
