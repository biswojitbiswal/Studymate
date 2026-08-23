"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { useMyTutor, useTutorApply } from "@/hooks/tutor/useTutor";
import { TutorStatusCard } from "@/components/tutor/TutorStatus";
import LoadingScreen from "@/components/common/LoadingScreen";

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
    const { data: tutor, isLoading } = useMyTutor();
    const { data: subjects = [] } = usePublicSubjects();
    const { data: levels = [] } = usePublicLevels();

    useEffect(() => {
        if (tutor?.data?.tutorStatus === "APPROVED") {
            router.replace("/dashboard/tutor");
        }
    }, [tutor, router]);

    if (isLoading) return <LoadingScreen />;

    return (
        <TutorApplicationForm
            key={tutor?.data?.updatedAt || "new-application"}
            tutor={tutor}
            subjects={subjects}
            levels={levels}
        />
    );
}

function TutorApplicationForm({ tutor, subjects, levels }) {
    const fileRef = useRef(null);
    const { mutate, isPending } = useTutorApply();
    const existingTutor = tutor?.data;

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(existingTutor?.user?.avatar || null);
    const [form, setForm] = useState({
        title: existingTutor?.title || "",
        bio: existingTutor?.bio || "",
        yearsOfExp: existingTutor?.yearsOfExp
            ? String(existingTutor.yearsOfExp)
            : "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [subjectIds, setSubjectIds] = useState(
        existingTutor?.tutorSubjects?.map((s) => s?.subject?.id) || []
    );
    const [levelIds, setLevelIds] = useState(
        existingTutor?.tutorLevels?.map((l) => l?.level?.id) || []
    );
    const [subjectsOpen, setSubjectsOpen] = useState(false);
    const [levelsOpen, setLevelsOpen] = useState(false);
    const [qualifications, setQualifications] = useState(
        existingTutor?.qualification || []
    );
    const [qualificationInput, setQualificationInput] = useState("");
    const [demoLinks, setDemoLinks] = useState(existingTutor?.demoLinks || []);
    const [demoLinkInput, setDemoLinkInput] = useState("");

    const handleAvatarChange = (file) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Avatar must be an image");
            return;
        }
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const toggle = (list, setList, id) => {
        setList((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const validate = () => {
        if (!avatar && !avatarPreview) return "Profile photo is required";
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

    const submit = () => {
        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }
        const formData = new FormData();

        if (avatar) formData.append("avatar", avatar);
        formData.append("title", form.title);
        formData.append("bio", form.bio);
        formData.append("yearsOfExp", form.yearsOfExp);

        qualifications.forEach((q) =>
            formData.append("qualification[]", q)
        );
        demoLinks.forEach((d) =>
            formData.append("demoLinks[]", d)
        );
        subjectIds.forEach((id) =>
            formData.append("subjectIds[]", id)
        );
        levelIds.forEach((id) =>
            formData.append("levelIds[]", id)
        );
        mutate(formData, {
            onSuccess: () => {
                setIsEditing(false);
                toast.success(
                    isEditing
                        ? "Application updated and sent for review"
                        : "Application submitted for review"
                );
            },
            onError: (err) =>
                toast.error(
                    err?.response?.data?.message ||
                    "Failed to submit application"
                ),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-26 px-4">
            <div className="mx-auto max-w-3xl">
                {/* STATUS CARD (PENDING + NOT EDITING) */}
                {tutor?.data?.tutorStatus === "PENDING_REVIEW" && !isEditing && (
                    <TutorStatusCard
                        tutor={tutor.data}
                        onEdit={() => setIsEditing(true)}
                    />
                )}

                {(tutor?.data?.tutorStatus !== "PENDING_REVIEW" || isEditing) && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">
                                Tutor Application Form
                            </CardTitle>
                            <CardDescription className="text-center">
                                Hi{" "}
                                <span className="text-blue-600 font-semibold">
                                    {tutor?.data?.user?.name}
                                </span>
                                , complete the form to become a StudyNest tutor
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* AVATAR */}
                            <div className="flex flex-col items-center">
                                <RequiredLabel>Profile Photo</RequiredLabel>
                                <div
                                    onClick={() => fileRef.current?.click()}
                                    className="relative mt-2 h-24 w-24 rounded-full bg-slate-200 overflow-hidden cursor-pointer ring-offset-2 transition hover:ring-2 hover:ring-blue-500"
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Choose a profile photo"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            fileRef.current?.click();
                                        }
                                    }}
                                >
                                    {avatarPreview ? (
                                        <Image
                                            src={avatarPreview}
                                            fill
                                            unoptimized
                                            className="h-full w-full object-cover"
                                            alt="Tutor profile preview"
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
                                    accept="image/*"
                                    hidden
                                    onChange={(e) =>
                                        e.target.files &&
                                        handleAvatarChange(e.target.files[0])
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <RequiredLabel htmlFor="title">Professional Title</RequiredLabel>
                                <Input
                                    id="title"
                                    required
                                    placeholder="e.g. Maths Educator"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <RequiredLabel htmlFor="yearsOfExp">Years of Experience</RequiredLabel>
                                <Input
                                    id="yearsOfExp"
                                    required
                                    min="1"
                                    max="60"
                                    type="number"
                                    placeholder="Enter years of experience"
                                    value={form.yearsOfExp}
                                    onChange={(e) =>
                                        setForm({ ...form, yearsOfExp: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <RequiredLabel htmlFor="bio">Short Bio</RequiredLabel>
                                <Textarea
                                    id="bio"
                                    required
                                    rows={4}
                                    placeholder="Tell students about your teaching experience"
                                    value={form.bio}
                                    onChange={(e) =>
                                        setForm({ ...form, bio: e.target.value })
                                    }
                                />
                            </div>

                            <Separator />

                            <DropdownMultiSelect
                                label="Subjects"
                                open={subjectsOpen}
                                setOpen={setSubjectsOpen}
                                items={subjects}
                                selected={subjectIds}
                                toggle={(id) =>
                                    toggle(subjectIds, setSubjectIds, id)
                                }
                            />

                            <DropdownMultiSelect
                                label="Levels"
                                open={levelsOpen}
                                setOpen={setLevelsOpen}
                                items={levels}
                                selected={levelIds}
                                toggle={(id) =>
                                    toggle(levelIds, setLevelIds, id)
                                }
                            />

                            <Separator />

                            <ChipInput
                                label="Qualifications"
                                input={qualificationInput}
                                setInput={setQualificationInput}
                                values={qualifications}
                                setValues={setQualifications}
                                placeholder="e.g. M.Sc. in Mathematics"
                            />

                            <ChipInput
                                label="Demo Links"
                                input={demoLinkInput}
                                setInput={setDemoLinkInput}
                                values={demoLinks}
                                setValues={setDemoLinks}
                                placeholder="https://example.com/demo"
                                inputType="url"
                            />

                            <Button
                                onClick={submit}
                                disabled={isPending}
                                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
                            >
                                {isPending ? "Submitting..." : "Submit Application"}
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function RequiredLabel({ children, htmlFor }) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-medium">
            {children} <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
        </label>
    );
}


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
            <RequiredLabel>{label}</RequiredLabel>

            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                aria-expanded={open}
                className="w-full cursor-pointer border rounded-lg px-3 py-2 bg-white text-left transition hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                            className="flex gap-2 px-3 py-2 cursor-pointer hover:bg-slate-50"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(i.id)}
                                onChange={() => toggle(i.id)}
                                className="cursor-pointer"
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
                        <button
                            type="button"
                            key={id}
                            className="inline-flex cursor-pointer items-center rounded-md border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => toggle(id)}
                            aria-label={`Remove ${item?.name}`}
                        >
                            {item?.name} ✕
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function ChipInput({
    label,
    input,
    setInput,
    values,
    setValues,
    placeholder,
    inputType = "text",
}) {
    return (
        <div>
            <RequiredLabel>{label}</RequiredLabel>

            <div className="flex gap-2">
                <Input
                    type={inputType}
                    aria-required="true"
                    placeholder={placeholder}
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
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                >
                    Add
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {values.map((v, i) => (
                    <button
                        type="button"
                        key={i}
                        className="inline-flex cursor-pointer items-center rounded-md border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() =>
                            setValues(values.filter((_, idx) => idx !== i))
                        }
                        aria-label={`Remove ${v}`}
                    >
                        {v} ✕
                    </button>
                ))}
            </div>
        </div>
    );
}
