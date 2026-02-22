"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useClass, useUpdateClass } from "@/hooks/tutor/useClass";
import LoadingScreen from "@/components/common/LoadingScreen";
import { ArrowLeft } from "lucide-react";

const DAYS = [
  { label: "Sun", value: "SUN" },
  { label: "Mon", value: "MON" },
  { label: "Tue", value: "TUE" },
  { label: "Wed", value: "WED" },
  { label: "Thu", value: "THU" },
  { label: "Fri", value: "FRI" },
  { label: "Sat", value: "SAT" },
];

export default function EditClassPage() {
  const { id } = useParams();
  const router = useRouter();

  /* ------------------ Data ------------------ */
  const { data, isLoading } = useClass(id);
  const { mutate: updateClass, isPending } = useUpdateClass();
  const klass = data?.data

  /* ------------------ State ------------------ */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [syllabusText, setSyllabusText] = useState("");

  const [visibility, setVisibility] = useState("PUBLIC");
  const [type, setType] = useState("GROUP");

  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [capacity, setCapacity] = useState(1);

  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [joiningStartDate, setJoiningStartDate] = useState("");
  const [joiningEndDate, setJoiningEndDate] = useState("");

  const [previewImg, setPreviewImg] = useState(null);
  const [previewVdo, setPreviewVdo] = useState(null);

  /* ------------------ Flags ------------------ */
  const isDraft = klass?.status === "DRAFT";
  const isGroup = type === "GROUP";

  /* ------------------ Populate initial data ------------------ */
  useEffect(() => {
    if (!klass) return;

    setTitle(klass.title);
    setDescription(klass.description);
    setVisibility(klass.visibility);
    setType(klass.type);

    setSyllabusText(
      Array.isArray(klass.syllabus)
        ? klass.syllabus.join("\n")
        : ""
    );

    setDaysOfWeek(klass.daysOfWeek || []);
    setStartTime(klass.startTime || "");
    setDurationMin(klass.durationMin || "");
    setCapacity(klass.capacity || 1);

    setIsPaid(klass.isPaid);
    setPrice(klass.price || "");
    setCurrency(klass.currency || "INR");

    setJoiningStartDate(
      klass.joiningStartDate?.split("T")[0] || ""
    );
    setJoiningEndDate(
      klass.joiningEndDate?.split("T")[0] || ""
    );
  }, [klass]);

  /* ------------------ Submit ------------------ */
  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "syllabus",
      JSON.stringify(
        syllabusText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      )
    );

    formData.append("visibility", visibility);

    if (isDraft) {
      formData.append("type", type);
      formData.append("capacity", String(capacity));
      formData.append("joiningStartDate", joiningStartDate);
      formData.append("joiningEndDate", joiningEndDate);

      if (type === "GROUP") {
        daysOfWeek.forEach((d) =>
          formData.append("daysOfWeek[]", d)
        );
        formData.append("startTime", startTime);
        formData.append("durationMin", String(durationMin));
      }

      formData.append("isPaid", String(isPaid));

      if (isPaid) {
        formData.append("price", String(price));
        formData.append("currency", currency);
      }
    }

    if (previewImg) formData.append("previewImg", previewImg);
    if (previewVdo) formData.append("previewVdo", previewVdo);

    updateClass(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Class updated successfully");
          router.push(`/dashboard/tutor/classes/${id}/overview`);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to update class"
          );
        },
      }
    );
  };

  if (isLoading) return <LoadingScreen />;

  /* ------------------ UI ------------------ */
  return (
    <div className="max-w-4xl mx-auto lg:p-6 space-y-4 lg:space-y-8">
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer mb-2"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-semibold">Edit Class</h1>
        <p className="text-sm text-gray-500">Edit you class details before you publish it.</p>
      </div>

      <div className="bg-white border rounded-xl px-2 py-4 lg:p-6 space-y-6">
        <div>
          <label className="text-sm font-medium">
            Class Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Class title"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Syllabus <span className="text-red-500">*</span>
          </label>
          <Textarea
            rows={6}
            value={syllabusText}
            onChange={(e) => setSyllabusText(e.target.value)}
            placeholder="One topic per line"
          />
          <p className="text-xs text-gray-500 mt-1">
            Each line will be saved as a syllabus item
          </p>
        </div>

        {/* ---------------- Type + Visibility ---------------- */}
        {isDraft && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Class Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GROUP">Group</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Visibility</label>
              <Select value={visibility} onValueChange={setVisibility}>
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
        )}

        {!isDraft && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Class Type</label>
              <Input value={klass.type} disabled />
            </div>
            <div>
              <label className="text-sm font-medium">Visibility</label>
              <Select value={visibility} onValueChange={setVisibility}>
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
        )}


        <div>
          <label className="text-sm font-medium">
            Joining Start Date <span className="text-red-500">*</span>
          </label>
          <Input type="date" value={joiningStartDate} onChange={(e) => setJoiningStartDate(e.target.value)} />
          {/* {errors.joiningStartDate && <p className="text-sm text-red-500 mt-1">{errors.joiningStartDate}</p>} */}
        </div>

        <div>
          <label className="text-sm font-medium">
            Joining End Date <span className="text-red-500">*</span>
          </label>
          <Input type="date" value={joiningEndDate} onChange={(e) => setJoiningEndDate(e.target.value)} />
          {/* {errors.joiningEndDate && <p className="text-sm text-red-500 mt-1">{errors.joiningEndDate}</p>} */}
        </div>

        {/* ---------------- Schedule (GROUP only) ---------------- */}
        {isDraft && isGroup && (
          <>
            <div>
              <label className="text-sm font-medium">
                Class Days <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 flex-wrap mt-2">
                {DAYS.map((d) => (
                  <label key={d.value} className="flex items-center gap-2">
                    <Checkbox
                      checked={daysOfWeek.includes(d.value)}
                      onCheckedChange={(c) =>
                        setDaysOfWeek((p) =>
                          c ? [...p, d.value] : p.filter((x) => x !== d.value)
                        )
                      }
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    {d.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Duration (min)</label>
                <Input
                  type="number"
                  value={durationMin}
                  onChange={(e) => setDurationMin(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Capacity</label>
                <Input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {/* ---------------- Pricing ---------------- */}
        {isDraft && (
          <>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Checkbox
                checked={isPaid}
                onCheckedChange={(v) => setIsPaid(Boolean(v))}
              />
              Paid Class
            </label>

            {isPaid && (
              <Input
                type="number"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            )}
          </>
        )}

        {/* ---------------- Preview Media ---------------- */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Preview Image</label>
            {klass.previewImg && (
              <img
                src={klass.previewImg}
                alt="Preview"
                className="mt-2 h-32 rounded border object-cover"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPreviewImg(e.target.files?.[0])}
              className="mt-2"
            />
            <p className="text-xs text-gray-500">Upload to replace existing image</p>
          </div>

          <div>
            <label className="text-sm font-medium">Preview Video</label>
            {klass.previewVdo && (
              <video
                src={klass.previewVdo}
                controls
                className="mt-2 h-32 rounded border"
              />
            )}
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setPreviewVdo(e.target.files?.[0])}
              className="mt-2"
            />
            <p className="text-xs text-gray-500">Upload to replace existing video</p>
          </div>
        </div>

        {/* ---------------- Actions ---------------- */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>

  );
}
