"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { useMyStudent, useUpdateStudentProfile } from "@/hooks/student/useStudent";
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { usePublicBoards } from "@/hooks/admin/useBoard";
import { usePublicLanguages } from "@/hooks/admin/useLanguage";
import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { useAuthStore } from "@/store/auth";


export default function StudentProfile({ common }) {
  const { data } = useMyStudent();
  const { mutate, isPending } = useUpdateStudentProfile();

  const [levelId, setLevelId] = useState();
  const [boardId, setBoardId] = useState();
  const [languageId, setLanguageId] = useState();
  const [subjectIds, setSubjectIds] = useState([]);
  const [goalsText, setGoalsText] = useState("");
  const [subjectsOpen, setSubjectsOpen] = useState(false);


  const { data: levels = [] } = usePublicLevels();
  const { data: boards = [] } = usePublicBoards();
  const { data: languages = [] } = usePublicLanguages();
  const { data: subjects = [] } = usePublicSubjects();

  useEffect(() => {
    if (!data?.data) return;
    const s = data.data;

    setLevelId(s.levelId);
    setBoardId(s.boardId);
    setLanguageId(s.preferredLanguageId);
    setSubjectIds(s.studentSubjects?.map((x) => x.subjectId) || []);
    setGoalsText((s.goals || []).join("\n"));
  }, [data]);


  const toggleSubject = (id) => {
    setSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const submit = () => {
    if (!common.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const fd = new FormData();

    // 🔑 shared (User)
    fd.append("name", common.name);
    fd.append("email", common.email);
    fd.append("phone", common.phone);
    if (common.avatar) fd.append("avatar", common.avatar);

    // 🎓 student
    if (levelId) fd.append("levelId", levelId);
    if (boardId) fd.append("boardId", boardId);
    if (languageId) fd.append("languageId", languageId);

    subjectIds.forEach((id) => fd.append("subjectIds[]", id));
    goalsText
      .split("\n")
      .map((g) => g.trim())
      .filter(Boolean)
      .forEach((g) => fd.append("goals[]", g));

    mutate(fd, {
      onSuccess: () => {
        toast.success("Student profile updated");

        // ✅ SYNC AUTH STORE
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
      onError: (e) =>
        toast.error(e?.response?.data?.message || "Update failed"),
    });
  };

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Student Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="gap-4">
          <label className="text-sm font-medium">
            Level/Class
          </label>
          <SearchSelect
            label="Level"
            options={levels.map((l) => ({ label: l.name, value: l.id }))}
            value={levelId}
            onChange={setLevelId}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Board
          </label>
          <SearchSelect
            label="Board"
            options={boards.map((b) => ({ label: b.name, value: b.id }))}
            value={boardId}
            onChange={setBoardId}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Prefered Language
          </label>
          <SearchSelect
            label="Language"
            options={languages.map((l) => ({ label: l.name, value: l.id }))}
            value={languageId}
            onChange={setLanguageId}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Goal
          </label>
          <Textarea
            rows={4}
            value={goalsText}
            onChange={(e) => setGoalsText(e.target.value)}
            placeholder="Goals (one per line)"
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

        <Button
          onClick={submit}
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 w-full hover:cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Student Profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
