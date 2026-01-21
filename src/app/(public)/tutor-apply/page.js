"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
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
    const fileRef = useRef(null);

    const { data: tutor, isLoading } = useMyTutor();
    const { data: subjects = [] } = usePublicSubjects();
    const { data: levels = [] } = usePublicLevels();
    const { mutate, isPending } = useTutorApply();


    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [form, setForm] = useState({
        title: "",
        bio: "",
        yearsOfExp: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    const [subjectIds, setSubjectIds] = useState([]);
    const [levelIds, setLevelIds] = useState([]);

    const [subjectsOpen, setSubjectsOpen] = useState(false);
    const [levelsOpen, setLevelsOpen] = useState(false);

    const [qualifications, setQualifications] = useState([]);
    const [qualificationInput, setQualificationInput] = useState("");

    const [demoLinks, setDemoLinks] = useState([]);
    const [demoLinkInput, setDemoLinkInput] = useState("");

    useEffect(() => {
        if (!tutor?.data) return;

        const t = tutor.data;

        setForm({
            title: t.title || "",
            bio: t.bio || "",
            yearsOfExp: t.yearsOfExp ? String(t.yearsOfExp) : "",
        });

        if (t.tutorSubjects?.length) {
            setSubjectIds(t?.tutorSubjects.map((s) => s?.subject?.id));
        }

        if (t.tutorLevels?.length) {
            setLevelIds(t.tutorLevels.map((l) => l.level.id));
        }

        if (t.qualification?.length) {
            setQualifications(t.qualification);
        }

        if (t.demoLinks?.length) {
            setDemoLinks(t.demoLinks);
        }

        if (t.user?.avatar) {
            setAvatarPreview(t.user.avatar);
        }
    }, [tutor]);

    useEffect(() => {
        if (tutor?.data?.tutorStatus === "APPROVED") {
            router.replace("/dashboard/tutor");
        }
    }, [tutor, router]);

    if (isLoading) return <LoadingScreen />;


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
        console.log(form);

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
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }



        mutate(formData, {
            onSuccess: () => toast.success("Application submitted"),
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
                                <div
                                    onClick={() => fileRef.current?.click()}
                                    className="relative h-24 w-24 rounded-full bg-slate-200 overflow-hidden cursor-pointer"
                                >
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            className="h-full w-full object-cover"
                                            alt="avatar"
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
                            />

                            <ChipInput
                                label="Demo Links"
                                input={demoLinkInput}
                                setInput={setDemoLinkInput}
                                values={demoLinks}
                                setValues={setDemoLinks}
                            />

                            <Button
                                onClick={submit}
                                disabled={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
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
                className="w-full border rounded-lg px-3 py-2 bg-white text-left"
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

function ChipInput({
    label,
    input,
    setInput,
    values,
    setValues,
}) {
    return (
        <div>
            <p className="text-sm font-medium">{label}</p>

            <div className="flex gap-2">
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
                    className="bg-blue-600 hover:bg-blue-700"
                >
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
