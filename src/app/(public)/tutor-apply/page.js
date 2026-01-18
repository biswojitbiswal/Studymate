"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { useMyTutor, useTutorApply } from "@/hooks/tutor/useTutor";

/* ---------------- STATUS UI ---------------- */
function CenteredMessage({ title, description }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Card className="max-w-md text-center p-6">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
            </Card>
        </div>
    );
}

export default function TutorApplyPage() {
    const router = useRouter();
    const fileRef = useRef(null);

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const { data: tutor, isLoading } = useMyTutor();
    const { data: subjects = [] } = usePublicSubjects();
    const { data: levels = [] } = usePublicLevels();
    const applyMutation = useTutorApply();

    /* ---------------- FORM STATE ---------------- */
    const [form, setForm] = useState({
        title: "",
        bio: "",
        yearsOfExp: "",
    });

    const [subjectIds, setSubjectIds] = useState([]);
    const [levelIds, setLevelIds] = useState([]);

    const [subjectsOpen, setSubjectsOpen] = useState(false);
    const [levelsOpen, setLevelsOpen] = useState(false);

    const [qualifications, setQualifications] = useState([]);
    const [qualificationInput, setQualificationInput] = useState("");

    const [demoLinks, setDemoLinks] = useState([]);
    const [demoLinkInput, setDemoLinkInput] = useState("");

    /* ---------------- ACCESS CONTROL ---------------- */
    useEffect(() => {
        if (!tutor) return;

        if (tutor.tutorStatus === "APPROVED") {
            router.replace("/tutor/dashboard");
        }
    }, [tutor, router]);

    if (!isLoading && tutor?.tutorStatus === "PENDING_REVIEW") {
        return (
            <CenteredMessage
                title="Application Under Review"
                description="Your tutor application is under review. We’ll notify you once approved."
            />
        );
    }

    const handleAvatarChange = (file) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Avatar must be an image file");
            return;
        }

        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    /* ---------------- HELPERS ---------------- */
    const toggle = (list, setList, id) => {
        setList((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const addChip = (value, setValue, list, setList) => {
        if (!value.trim()) return;
        setList([...list, value.trim()]);
        setValue("");
    };

    const removeChip = (index, list, setList) => {
        setList(list.filter((_, i) => i !== index));
    };

    /* ---------------- VALIDATION ---------------- */
    const validate = () => {
        if (!form.title.trim()) return "Title is required";
        if (!form.bio.trim()) return "Bio is required";
        if (!form.yearsOfExp || Number(form.yearsOfExp) <= 0)
            return "Valid experience is required";
        if (subjectIds.length === 0) return "Select at least one subject";
        if (levelIds.length === 0) return "Select at least one level";
        if (qualifications.length === 0)
            return "Add at least one qualification";
        if (demoLinks.length === 0) return "Add at least one demo link";
        return null;
    };

    /* ---------------- SUBMIT ---------------- */
    const submit = () => {
        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }

        applyMutation.mutate({
            title: form.title,
            bio: form.bio,
            yearsOfExp: Number(form.yearsOfExp),
            qualification: qualifications,
            demoLinks,
            subjectIds,
            levelIds,
        });
    };
console.log(tutor);

    /* ---------------- UI ---------------- */
    return (
        <div className="min-h-screen bg-slate-50 py-26 px-4">
            <div className="mx-auto max-w-3xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Tutor Application Form
                        </CardTitle>
                        <CardDescription className="text-center">
                            Hii <span className="text-blue-600 font-semibold">{tutor?.data?.user?.name}</span>, Complete Tutor Form To Become a StudyNest Tutor
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
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

                        {/* BASIC INFO */}
                        <Input
                            placeholder="Title (e.g. Maths Educator)"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />

                        <Input
                            type="number"
                            placeholder="Years of Experience"
                            value={form.yearsOfExp}
                            onChange={(e) =>
                                setForm({ ...form, yearsOfExp: e.target.value })
                            }
                        />

                        <Textarea
                            rows={4}
                            placeholder="Short bio"
                            value={form.bio}
                            onChange={(e) =>
                                setForm({ ...form, bio: e.target.value })
                            }
                        />

                        <Separator />

                        {/* SUBJECTS */}
                        <DropdownMultiSelect
                            label="Subjects"
                            open={subjectsOpen}
                            setOpen={setSubjectsOpen}
                            items={subjects}
                            selected={subjectIds}
                            toggle={(id) => toggle(subjectIds, setSubjectIds, id)}
                        />

                        {/* LEVELS */}
                        <DropdownMultiSelect
                            label="Levels"
                            open={levelsOpen}
                            setOpen={setLevelsOpen}
                            items={levels}
                            selected={levelIds}
                            toggle={(id) => toggle(levelIds, setLevelIds, id)}
                        />

                        <Separator />

                        {/* QUALIFICATIONS */}
                        <ChipInput
                            label="Qualifications"
                            input={qualificationInput}
                            setInput={setQualificationInput}
                            values={qualifications}
                            setValues={setQualifications}
                        />

                        {/* DEMO LINKS */}
                        <ChipInput
                            label="Demo Links"
                            input={demoLinkInput}
                            setInput={setDemoLinkInput}
                            values={demoLinks}
                            setValues={setDemoLinks}
                        />

                        <Button
                            onClick={submit}
                            disabled={applyMutation.isPending}
                            className="w-full bg-blue-600"
                        >
                            {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function DropdownMultiSelect({
    label,
    open,
    setOpen,
    items,
    selected,
    toggle,
}) {
    return (
        <div>
            <p className="text-sm font-medium">{label}</p>

            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="w-full border rounded-lg px-3 py-2 text-left bg-white"
            >
                {selected.length
                    ? `${selected.length} selected`
                    : `Select ${label}`}
            </button>

            {open && (
                <div className="border rounded-lg mt-1 max-h-48 overflow-auto bg-white">
                    {items.map((i) => (
                        <label
                            key={i.id}
                            className="flex gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(i.id)}
                                onChange={() => toggle(i.id)}
                            />
                            {i.name}
                        </label>
                    ))}
                </div>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
                {selected.map((id) => {
                    const item = items.find((i) => i.id === id);
                    return (
                        <Badge
                            key={id}
                            className="bg-blue-100 text-blue-700 cursor-pointer"
                            onClick={() => toggle(id)}
                        >
                            {item?.name} ✕
                        </Badge>
                    );
                })}
            </div>
        </div>
    );
}

function ChipInput({ label, input, setInput, values, setValues }) {
    const add = () => {
        if (!input.trim()) return;
        setValues([...values, input.trim()]);
        setInput("");
    };

    return (
        <div>
            <p className="text-sm font-medium">{label}</p>

            <div className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} />
                <Button type="button" className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700" onClick={add}>
                    Add
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {values.map((v, i) => (
                    <Badge
                        key={i}
                        className="bg-blue-100 text-blue-700 cursor-pointer"
                        onClick={() =>
                            setValues(values.filter((_, idx) => idx !== i))
                        }
                    >
                        {v} ✕
                    </Badge>
                ))}
            </div>
        </div>
    );
}
