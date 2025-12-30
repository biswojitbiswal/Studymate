"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchSelect } from "@/components/ui/SearchSelect";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

import { useBoards, usePublicBoards } from "@/hooks/admin/useBoard";
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { usePublicLanguages } from "@/hooks/admin/useLanguage";
import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { useCreateClass } from "@/hooks/tutor/useClass";
import { toast } from "sonner";


const DAYS = [
    { label: "Sun", value: "SUN" },
    { label: "Mon", value: "MON" },
    { label: "Tue", value: "TUE" },
    { label: "Wed", value: "WED" },
    { label: "Thu", value: "THU" },
    { label: "Fri", value: "FRI" },
    { label: "Sat", value: "SAT" },
];

export default function CreateClassPage() {
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [syllabusText, setSyllabusText] = useState("");


    const [subjectId, setSubjectId] = useState(undefined);
    const [levelId, setLevelId] = useState(undefined);
    const [boardId, setBoardId] = useState(undefined);
    const [languageId, setLanguageId] = useState(undefined);

    const [type, setType] = useState("GROUP");
    const [visibility, setVisibility] = useState("PUBLIC");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [joiningStartDate, setJoiningStartDate] = useState("");
    const [joiningEndDate, setJoiningEndDate] = useState("");

    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [startTime, setStartTime] = useState(undefined);
    const [durationMin, setDurationMin] = useState(undefined);

    const [capacity, setCapacity] = useState(1);

    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState(undefined);
    const [currency] = useState("INR");


    /* ------------------ Auto rules ------------------ */
    useEffect(() => {
        if (type === "PRIVATE") {
            setCapacity(1);
            setDaysOfWeek([]);
            setStartTime(undefined);
            setDurationMin(undefined);
        }
    }, [type]);

    /* ------------------ Data hooks ------------------ */
    const { data: boards = [] } = usePublicBoards();
    const { data: levels = [] } = usePublicLevels();
    const { data: languages = [] } = usePublicLanguages();
    const { data: subjects = [] } = usePublicSubjects();


    const boardOptions = boards?.map((b) => ({ label: b.name, value: b.id }));
    const subjectOptions = subjects.map((s) => ({ label: s.name, value: s.id }));
    const levelOptions = levels.map((l) => ({ label: l.name, value: l.id }));
    const languageOptions = languages.map((l) => ({ label: l.name, value: l.id }));


    const parseSyllabus = () => {
        if (!syllabusText.trim()) return [];

        // If valid JSON, use it
        try {
            const parsed = JSON.parse(syllabusText);
            if (Array.isArray(parsed)) return parsed;
        } catch { }

        // Otherwise, treat as newline list
        return syllabusText
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
    };


    const validateForm = () => {
        const e = {};

        if (!title.trim()) e.title = "Title is required";
        if (!description.trim()) e.description = "Description is required";

        if (!subjectId) e.subjectId = "Subject is required";
        if (!levelId) e.levelId = "Level is required";

        if (!startDate) e.startDate = "Start date is required";
        if (!endDate) e.endDate = "End date is required";
        if (!joiningStartDate) e.joiningStartDate = "Joining start date is required";
        if (!joiningEndDate) e.joiningEndDate = "Joining end date is required";

        if (type === "GROUP") {
            if (!daysOfWeek.length) e.daysOfWeek = "Select at least one class day";
            if (!startTime) e.startTime = "Start time is required";
            if (!durationMin) e.durationMin = "Duration is required";
        }

        if (isPaid && !price) e.price = "Price is required for paid class";

        // syllabus JSON validation
        if (syllabusText.trim()) {
            const lines = syllabusText
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);

            if (lines.length === 0) {
                e.syllabus = "Syllabus cannot be empty";
            }
        }


        setErrors(e);

        if (Object.keys(e).length > 0) {
            const firstError = Object.values(e)[0];
            toast.error(firstError);
            return false;
        }

        return true;
    };

    const { mutate: createClass, isPending } = useCreateClass();

    const handleSubmit = () => {
        if (!validateForm()) return;

        const payload = {
            title,
            description,
            subjectId,
            levelId,
            boardId,
            languageId,

            syllabus: parseSyllabus(),

            type,
            visibility,

            startDate,
            endDate,
            joiningStartDate,
            joiningEndDate,

            daysOfWeek: type === "GROUP" ? daysOfWeek : undefined,
            startTime: type === "GROUP" ? startTime : undefined,
            durationMin: type === "GROUP" ? durationMin : undefined,

            capacity,
            isPaid,
            price: isPaid ? price : undefined,
            currency: isPaid ? currency : undefined,
        };

        createClass(payload, {
            onSuccess: () => {
                toast.success("Class created successfully");
                resetForm();
            },
            onError: (err) => {
                const msg =
                    err?.response?.data?.message || "Failed to create class";
                toast.error(msg);
            },
        });
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");

        setSubjectId(undefined);
        setLevelId(undefined);
        setBoardId(undefined);
        setLanguageId(undefined);

        setType("GROUP");
        setVisibility("PUBLIC");

        setStartDate("");
        setEndDate("");
        setJoiningStartDate("");
        setJoiningEndDate("");

        setDaysOfWeek([]);
        setStartTime(undefined);
        setDurationMin(undefined);

        setCapacity(1);

        setIsPaid(false);
        setPrice(undefined);

        setSyllabusText("");   // if you added syllabus

        setErrors({});
    };



    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">Create New Class</h1>
                <p className="text-sm text-gray-500">
                    Configure your class before publishing
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white border rounded-xl p-6 space-y-6">

                {/* ───────── Title ───────── */}
                <div>
                    <label className="text-sm font-medium">
                        Class Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Maths for Class 10"
                        className={errors.title ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                    )}
                </div>

                {/* ───────── Description ───────── */}
                <div>
                    <label className="text-sm font-medium">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what students will learn"
                        rows={4}
                        className={errors.description ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                    )}
                </div>

                {/* ───────── Syllabus ───────── */}
                <div>
                    <label className="text-sm font-medium">
                        Syllabus
                    </label>

                    <Textarea
                        rows={6}
                        value={syllabusText}
                        onChange={(e) => setSyllabusText(e.target.value)}
                        placeholder={`Example:
[
  Number System,
  Linear Equation,
  Trigonometry,
  Statitics,
  Probability,
]`}
                        className={errors.syllabus ? "border-red-500 focus:ring-red-500" : ""}
                    />

                    <p className="text-xs text-gray-500 mt-1">
                        Optional. Must be valid JSON if provided.
                    </p>

                    {errors.syllabus && (
                        <p className="text-sm text-red-500 mt-1">{errors.syllabus}</p>
                    )}
                </div>


                {/* ───────── Academic Info ───────── */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Subject */}
                    <div>
                        <label className="text-sm font-medium">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <SearchSelect
                            options={subjectOptions}
                            value={subjectId}
                            placeholder="Select subject"
                            onChange={setSubjectId}
                        />
                        {errors.subjectId && (
                            <p className="text-sm text-red-500 mt-1">{errors.subjectId}</p>
                        )}
                    </div>

                    {/* Level */}
                    <div>
                        <label className="text-sm font-medium">
                            Level <span className="text-red-500">*</span>
                        </label>
                        <SearchSelect
                            options={levelOptions}
                            value={levelId}
                            placeholder="Select level"
                            onChange={setLevelId}
                        />
                        {errors.levelId && (
                            <p className="text-sm text-red-500 mt-1">{errors.levelId}</p>
                        )}
                    </div>

                    {/* Board */}
                    <div>
                        <label className="text-sm font-medium">Board</label>
                        <SearchSelect
                            options={boardOptions}
                            value={boardId}
                            placeholder="Select board"
                            onChange={setBoardId}
                        />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="text-sm font-medium">Language</label>
                        <SearchSelect
                            options={languageOptions}
                            value={languageId}
                            placeholder="Select language"
                            onChange={setLanguageId}
                        />
                    </div>
                </div>

                {/* ───────── Type & Visibility ───────── */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Class Type</label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GROUP">Group</SelectItem>
                                <SelectItem value="PRIVATE">Private (1–1)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Visibility</label>
                        <Select value={visibility} onValueChange={setVisibility}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PUBLIC">Public</SelectItem>
                                <SelectItem value="PRIVATE">Private</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* ───────── Dates ───────── */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">
                            Class Start Date <span className="text-red-500">*</span>
                        </label>
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Class End Date <span className="text-red-500">*</span>
                        </label>
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Joining Start Date <span className="text-red-500">*</span>
                        </label>
                        <Input type="date" value={joiningStartDate} onChange={(e) => setJoiningStartDate(e.target.value)} />
                        {errors.joiningStartDate && <p className="text-sm text-red-500 mt-1">{errors.joiningStartDate}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Joining End Date <span className="text-red-500">*</span>
                        </label>
                        <Input type="date" value={joiningEndDate} onChange={(e) => setJoiningEndDate(e.target.value)} />
                        {errors.joiningEndDate && <p className="text-sm text-red-500 mt-1">{errors.joiningEndDate}</p>}
                    </div>
                </div>

                {/* ───────── Group Schedule ───────── */}
                {type === "GROUP" && (
                    <>
                        <div>
                            <label className="text-sm font-medium">
                                Class Days <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {DAYS.map((d) => (
                                    <label key={d.value} className="flex items-center gap-2 cursor-pointer">
                                        <Checkbox
                                            checked={daysOfWeek.includes(d.value)}
                                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            onCheckedChange={(c) =>
                                                setDaysOfWeek((p) =>
                                                    c ? [...p, d.value] : p.filter((x) => x !== d.value)
                                                )
                                            }
                                        />
                                        {d.label}
                                    </label>
                                ))}
                            </div>
                            {errors.daysOfWeek && (
                                <p className="text-sm text-red-500 mt-1">{errors.daysOfWeek}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium">Start Time <span className="text-red-500">*</span></label>
                                <Input type="time" value={startTime ?? ""} onChange={(e) => setStartTime(e.target.value)} />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Duration (min) <span className="text-red-500">*</span></label>
                                <Input type="number" value={durationMin ?? ""} onChange={(e) => setDurationMin(Number(e.target.value))} />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Capacity</label>
                                <Input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
                            </div>
                        </div>
                    </>
                )}

                {/* ───────── Private ───────── */}
                {type === "PRIVATE" && (
                    <div>
                        <label className="text-sm font-medium">Capacity</label>
                        <Input value="1 (Private class)" disabled />
                    </div>
                )}

                {/* ───────── Pricing ───────── */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium">
                        <Checkbox checked={isPaid} onCheckedChange={(c) => setIsPaid(Boolean(c))} />
                        Paid Class
                    </label>
                </div>

                {isPaid && (
                    <div>
                        <label className="text-sm font-medium">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="number"
                            value={price ?? ""}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className={errors.price ? "border-red-500 focus:ring-red-500" : ""}
                        />
                        {errors.price && (
                            <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                        )}
                    </div>
                )}

                {/* ───────── Action ───────── */}
                <div className="flex justify-end">
                    <Button
                        disabled={isPending}
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isPending ? "Creating..." : "Create Class"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
