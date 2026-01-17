"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { toast } from "sonner";

/* ------------------ Data hooks ------------------ */
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { usePublicBoards } from "@/hooks/admin/useBoard";
import { usePublicLanguages } from "@/hooks/admin/useLanguage";
import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { useUpdateStudentProfile } from "@/hooks/student/useStudent";

export default function CompleteStudentProfilePage() {
  const router = useRouter();
  const fileRef = useRef(null);

  /* ------------------ State ------------------ */
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [levelId, setLevelId] = useState();
  const [boardId, setBoardId] = useState();
  const [languageId, setLanguageId] = useState();

  const [subjectIds, setSubjectIds] = useState([]);
  const [subjectsOpen, setSubjectsOpen] = useState(false);

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

  const handleAvatarChange = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Avatar must be an image file");
      return;
    }

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const toggleSubject = (id) => {
    setSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (avatar) formData.append("avatar", avatar);
    if (levelId) formData.append("levelId", levelId);
    if (boardId) formData.append("boardId", boardId);
    if (languageId) formData.append("preferredLanguageId", languageId);

    subjectIds.forEach((id) => formData.append("subjectIds[]", id));
    parseGoals().forEach((g) => formData.append("goals[]", g));
    console.log(formData);

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        router.push("/dashboard/student");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update profile");
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
          <div className="flex flex-col items-center mb-6">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  className="h-full w-full object-cover"
                  alt="avatar"
                />
              ) : (
                <span className="text-xl text-slate-500">+</span>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-xs">
                Change
              </div>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files && handleAvatarChange(e.target.files[0])}
            />

            <p className="mt-2 text-xs text-slate-500">
              Upload a profile photo (optional)
            </p>
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

            {/* Subjects */}
            <div className="">
              <label className="text-sm font-medium">
                Subjects You Are Studying
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSubjectsOpen((p) => !p)}
                  className="w-full border rounded-lg px-3 py-2 text-left text-sm bg-white"
                >
                  {subjectIds.length
                    ? `${subjectIds.length} subjects selected`
                    : "Select subjects"}
                </button>

                {subjectsOpen && (
                  <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto border bg-white rounded-lg shadow">
                    {subjects.map((s) => (
                      <label
                        key={s.id}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={subjectIds.includes(s.id)}
                          onChange={() => toggleSubject(s.id)}
                        />
                        {s.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>


            </div>
          </div>

          {/* Chips */}
          {subjectIds.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {subjectIds.map((id) => {
                const subject = subjects.find((s) => s.id === id);
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                  >
                    {subject?.name}
                    <button onClick={() => toggleSubject(id)}>×</button>
                  </span>
                );
              })}
            </div>
          )}


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
              className="text-sm text-slate-500 hover:text-blue-600 hover:underline hover:cursor-pointer"
            >
              Skip for now
            </button>

            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="rounded-full bg-blue-600 px-10 hover:bg-blue-700 hover:cursor-pointer"
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
