"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { useMyTutor, useUpdateTutorProfile } from "@/hooks/tutor/useTutor";

/* ======================================================
   Dropdown Multi Select with Chips (Reusable)
   ====================================================== */
function DropdownMultiSelectWithChips({
  label,
  items,
  selectedIds,
  setSelectedIds,
  placeholder,
}) {
  const [open, setOpen] = useState(false);

  const toggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <div className="relative mt-1">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="w-full border rounded-lg px-3 py-2 text-left text-sm bg-white"
        >
          {selectedIds.length
            ? `${selectedIds.length} selected`
            : placeholder}
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full max-h-48 overflow-auto border bg-white rounded-lg shadow">
            {items.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggle(item.id)}
                />
                {item.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Chips */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 hover:cursor-pointer">
          {selectedIds.map((id) => {
            const item = items.find((i) => i.id === id);
            return (
              <span
                key={id}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                {item?.name}
                <button
                  onClick={() => toggle(id)}
                  className="hover:text-red-600 hover:cursor-pointer"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}


function ChipInput({ label, values, setValues }) {
  const [input, setInput] = useState("");

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <div className="flex gap-2 mt-1">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            if (!input.trim()) return;
            setValues([...values, input.trim()]);
            setInput("");
          }}
          className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
        >
          Add
        </Button>
      </div>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {values.map((v, i) => (
            <span
              key={i}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs cursor-pointer"
              onClick={() =>
                setValues(values.filter((_, idx) => idx !== i))
              }
            >
              {v} ×
            </span>
          ))}
        </div>
      )}
    </div>
  );
}


export default function TutorProfile({ common }) {
  const { data: tutor } = useMyTutor();
  const { mutate, isPending } = useUpdateTutorProfile();

  const { data: subjects = [] } = usePublicSubjects();
  const { data: levels = [] } = usePublicLevels();

  const [form, setForm] = useState({
    title: "",
    bio: "",
    yearsOfExp: "",
  });

  const [subjectIds, setSubjectIds] = useState([]);
  const [levelIds, setLevelIds] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [demoLinks, setDemoLinks] = useState([]);

  useEffect(() => {
    if (!tutor?.data) return;

    const t = tutor.data;

    setForm({
      title: t.title || "",
      bio: t.bio || "",
      yearsOfExp: t.yearsOfExp ? String(t.yearsOfExp) : "",
    });

    setSubjectIds(t.tutorSubjects?.map((s) => s.subject.id) || []);
    setLevelIds(t.tutorLevels?.map((l) => l.level.id) || []);
    setQualifications(t.qualification || []);
    setDemoLinks(t.demoLinks || []);
  }, [tutor]);



  const submit = () => {
    if (!common.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.bio.trim()) {
      toast.error("Bio is required");
      return;
    }
    if (!form.yearsOfExp || Number(form.yearsOfExp) <= 0) {
      toast.error("Valid experience is required");
      return;
    }
    if (subjectIds.length === 0) {
      toast.error("Select at least one subject");
      return;
    }
    if (levelIds.length === 0) {
      toast.error("Select at least one level");
      return;
    }
    if (qualifications.length === 0) {
      toast.error("Add at least one qualification");
      return;
    }
    if (demoLinks.length === 0) {
      toast.error("Add at least one demo link");
      return;
    }

    const fd = new FormData();

    // 🔑 User fields
    fd.append("name", common.name);
    fd.append("email", common.email);
    fd.append("phone", common.phone);
    if (common.avatar) fd.append("avatar", common.avatar);

    // 🎓 Tutor fields
    fd.append("title", form.title);
    fd.append("bio", form.bio);
    fd.append("yearsOfExp", form.yearsOfExp);

    qualifications.forEach((q) => fd.append("qualification[]", q));
    demoLinks.forEach((d) => fd.append("demoLinks[]", d));
    subjectIds.forEach((id) => fd.append("subjectIds[]", id));
    levelIds.forEach((id) => fd.append("levelIds[]", id));

    mutate(fd, {
      onSuccess: () => {
        toast.success("Tutor profile updated");

        // ✅ Sync Zustand auth user
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
        toast.error(
          e?.response?.data?.message || "Update failed"
        ),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutor Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium">
            Title
          </label>
          <Input
            placeholder="Title (e.g. Maths Educator)"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Year Of Experience
          </label>
          <Input
            type="number"
            placeholder="Years of experience"
            value={form.yearsOfExp}
            onChange={(e) =>
              setForm({ ...form, yearsOfExp: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Short bio
          </label>
          <Textarea
            rows={4}
            placeholder="Short bio"
            value={form.bio}
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
          />

        </div>
        <Separator />

        <DropdownMultiSelectWithChips
          label="Subjects You Teach"
          items={subjects}
          selectedIds={subjectIds}
          setSelectedIds={setSubjectIds}
          placeholder="Select subjects"
        />

        <DropdownMultiSelectWithChips
          label="Levels You Teach"
          items={levels}
          selectedIds={levelIds}
          setSelectedIds={setLevelIds}
          placeholder="Select levels"
        />

        <Separator />

        <ChipInput
          label="Qualifications"
          values={qualifications}
          setValues={setQualifications}
        />

        <ChipInput
          label="Demo Links"
          values={demoLinks}
          setValues={setDemoLinks}
        />

        <Button
          onClick={submit}
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Tutor Profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
