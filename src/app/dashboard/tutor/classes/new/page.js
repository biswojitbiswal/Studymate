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

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const boards = [
    { label: "CBSE", value: "cbse" },
    { label: "ICSE", value: "icse" },
    { label: "State Board", value: "state" },
];

const subjects = [
    { label: "Mathematics", value: "math" },
    { label: "Physics", value: "physics" },
    { label: "Chemistry", value: "chemistry" },
];

const levels = [
    { label: "Class 8", value: "8" },
    { label: "Class 9", value: "9" },
    { label: "Class 10", value: "10" },
];

const languages = [
    { label: "English", value: "en" },
    { label: "Hindi", value: "hi" },
];

export default function CreateClassPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Create New Class
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Create your class and configure details before publishing
                </p>
            </div>

            <div className="bg-white border rounded-xl p-6 space-y-8">
                {/* Title */}
                <div>
                    <label className="text-sm font-medium">Class Title</label>
                    <Input placeholder="e.g. Maths for Class 10" />
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                        placeholder="Describe what students will learn..."
                        rows={4}
                    />
                </div>

                {/* Board / Subject / Level / Language */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Board</label>
                        <SearchSelect
                            placeholder="Select board"
                            options={boards}
                            onChange={() => { }}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Subject</label>
                        <SearchSelect
                            placeholder="Select subject"
                            options={subjects}
                            onChange={() => { }}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Level</label>
                        <SearchSelect
                            placeholder="Select level"
                            options={levels}
                            onChange={() => { }}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Language</label>
                        <SearchSelect
                            placeholder="Select language"
                            options={languages}
                            onChange={() => { }}
                        />
                    </div>
                </div>

                {/* Syllabus */}
                <div>
                    <label className="text-sm font-medium">Syllabus</label>
                    <Textarea
                        rows={5}
                        placeholder={`Example:
1. Algebra
2. Quadratic Equations
3. Trigonometry`}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        You can refine syllabus structure later.
                    </p>
                </div>

                {/* Preview Image & Video */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Preview Image URL</label>
                        <Input placeholder="https://image-url.com/preview.jpg" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Preview Video URL</label>
                        <Input placeholder="https://youtube.com/..." />
                    </div>
                </div>

                {/* Type & Visibility */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Class Type</label>
                        <Select defaultValue="GROUP">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GROUP">Group</SelectItem>
                                <SelectItem value="PRIVATE">Private (1–1)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Visibility</label>
                        <Select defaultValue="PUBLIC">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PUBLIC">Public</SelectItem>
                                <SelectItem value="PRIVATE">Private</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Class Start Date</label>
                        <Input type="date" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Class End Date</label>
                        <Input type="date" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Joining Start Date</label>
                        <Input type="date" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Joining End Date</label>
                        <Input type="date" />
                    </div>
                </div>

                {/* Schedule */}
                <div>
                    <label className="text-sm font-medium block mb-2">
                        Class Days
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {DAYS.map((day) => (
                            <label key={day} className="flex items-center gap-2 text-sm">
                                <Checkbox />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium">Start Time</label>
                        <Input type="time" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Duration (minutes)</label>
                        <Input type="number" placeholder="60" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Capacity</label>
                        <Input type="number" placeholder="1" />
                    </div>
                </div>

                {/* Pricing */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium">
                        <Checkbox /> Paid Class
                    </label>

                    <Input
                        type="number"
                        placeholder="Enter price"
                        className="max-w-xs"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Create Class
                    </Button>
                </div>
            </div>
        </div>
    );
}
