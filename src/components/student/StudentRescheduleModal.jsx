"use client";
import { useState } from "react";
import { useRescheduleSession } from "@/hooks/public/useSession";
import { toast } from "sonner";

export default function StudentRescheduleModal({ open, onClose, session }) {
  const { mutate, isPending } = useRescheduleSession();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [durationMin, setDurationMin] = useState(60);
  const [reason, setReason] = useState("");

  if (!open || !session) return null;

  const handleSubmit = () => {
    if (!date || !startTime || !durationMin) return;

    mutate(
      {
        sessionId: session.id,
        data: { date, startTime, durationMin: Number(durationMin), reason },
      },
      {
        onSuccess: () => {
          toast.success("Request sent to tutor for approval");
          onClose();
        },
        onError: (error) => {
          const msg = error?.response?.data?.message || "Failed to send request";
          toast.error(Array.isArray(msg) ? msg[0] : msg);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Request New Time</h2>

        <input type="date" className="w-full border rounded-md px-3 py-2"
          value={date} onChange={e => setDate(e.target.value)} />

        <input type="time" className="w-full border rounded-md px-3 py-2"
          value={startTime} onChange={e => setStartTime(e.target.value)} />

        <input type="number" min={15} step={15}
          className="w-full border rounded-md px-3 py-2"
          value={durationMin} onChange={e => setDurationMin(e.target.value)} />

        <textarea
          placeholder="Reason (optional but recommended)"
          className="w-full border rounded-md px-3 py-2"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-4 py-2 rounded-md hover:cursor-pointer">Cancel</button>
          <button disabled={isPending} onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:cursor-pointer">
            {isPending ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}