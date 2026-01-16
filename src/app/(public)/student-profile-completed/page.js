"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/* ------------------ Data hooks ------------------ */
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { usePublicBoards } from "@/hooks/admin/useBoard";
import { usePublicLanguages } from "@/hooks/admin/useLanguage";
import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { useUpdateStudentProfile } from "@/hooks/student/useStudent";

export default function CompleteStudentProfilePage() {
  const router = useRouter();

  /* ------------------ State ------------------ */
  const [avatar, setAvatar] = useState(null);

  const [levelId, setLevelId] = useState();
  const [boardId, setBoardId] = useState();
  const [languageId, setLanguageId] = useState();

  const [subjectIds, setSubjectIds] = useState([]);
  const [goalsText, setGoalsText] = useState("");

  /* ------------------ Data ------------------ */
  const { data: levels = [] } = usePublicLevels();
  const { data: boards = [] } = usePublicBoards();
  const { data: languages = [] } = usePublicLanguages();
  const { data: subjects = [] } = usePublicSubjects();

  const levelOptions = levels.map((l) => ({ label: l.name, value: l.id }));
  const boardOptions = boards.map((b) => ({ label: b.name, value: b.id }));
  const languageOptions = languages.map((l) => ({ label: l.name, value: l.id }));

  /* ------------------ Mutation ------------------ */
  const { mutate: updateProfile, isPending } = useUpdateStudentProfile();

  /* ------------------ Helpers ------------------ */
  const parseGoals = () =>
    goalsText
      .split("\n")
      .map((g) => g.trim())
      .filter(Boolean);

  const handleSubmit = () => {
    if (avatar && !avatar.type.startsWith("image/")) {
      toast.error("Avatar must be an image file");
      return;
    }

    const formData = new FormData();

    if (avatar) formData.append("avatar", avatar);
    if (levelId) formData.append("levelId", levelId);
    if (boardId) formData.append("boardId", boardId);
    if (languageId) formData.append("preferredLanguageId", languageId);

    subjectIds.forEach((id) => formData.append("subjectIds[]", id));
    parseGoals().forEach((g) => formData.append("goals[]", g));

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        router.push("/dashboard/student");
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Failed to update profile"
        );
      },
    });
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-24">
      <Card className="w-full max-w-3xl rounded-lg shadow-md">
        <CardContent className="px-10 py-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Complete Your Student Profile
            </h1>
            <p className="mt-2 text-sm text-blue-600 max-w-xl mx-auto">
              This helps us recommend the right classes, tutors, and study groups
              for you.
            </p>
          </div>

          {/* Avatar */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Profile Avatar (optional)
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
          </div>

          {/* Academic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Level / Class</label>
              <SearchSelect
                options={levelOptions}
                value={levelId}
                placeholder="Select level"
                onChange={setLevelId}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Education Board</label>
              <SearchSelect
                options={boardOptions}
                value={boardId}
                placeholder="Select board"
                onChange={setBoardId}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Preferred Language</label>
              <SearchSelect
                options={languageOptions}
                value={languageId}
                placeholder="Select language"
                onChange={setLanguageId}
              />
            </div>
          </div>

          {/* Subjects */}
          <div className="mt-4">
            <label className="text-sm font-medium">
              Subjects You Are Studying
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {subjects.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={subjectIds.includes(s.id)}
                    onCheckedChange={(c) =>
                      setSubjectIds((prev) =>
                        c
                          ? [...prev, s.id]
                          : prev.filter((id) => id !== s.id)
                      )
                    }
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="mt-4">
            <label className="text-sm font-medium">
              Your Learning Goals (Optional)
            </label>
            <Textarea
              rows={4}
              value={goalsText}
              onChange={(e) => setGoalsText(e.target.value)}
              placeholder={`e.g.
Improve concepts
Prepare for exams
Clear doubts regularly`}
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard/student")}
              className="text-sm text-slate-500 hover:text-blue-600 hover:underline"
            >
              Skip for now
            </button>

            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="rounded-full bg-blue-600 px-10 hover:bg-blue-700"
            >
              {isPending ? "Saving..." : "Save & Continue"}
            </Button>
          </div>

          <p className="mt-3 text-xs text-center text-slate-500">
            You can update your profile anytime from your dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
