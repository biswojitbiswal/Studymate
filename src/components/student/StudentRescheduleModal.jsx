"use client";
import { useState } from "react";
import { useRescheduleSession } from "@/hooks/public/useSession";
import { toast } from "sonner";
import { useClassContext } from "@/app/dashboard/tutor/classes/[id]/(with-layout)/ClassContext";
import { useEnrolledClassContext } from "@/app/dashboard/student/learning/[id]/(with-layout)/EnrolledClassContext";
import { useFreeAvailability } from "@/hooks/tutor/useAvailability";

export default function StudentRescheduleModal({ open, onClose, session }) {
  const { klass } = useEnrolledClassContext()
  const { mutate, isPending } = useRescheduleSession();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [durationMin, setDurationMin] = useState(60);
  const [reason, setReason] = useState("");

  const tutorId = klass?.tutorId;

  const { data: freeSlots, isLoading } = useFreeAvailability(tutorId, date);

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

        {date && (
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Available Slots</label>

            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-7 bg-gray-200 rounded-md animate-pulse"
                  />
                ))}
              </div>
            ) : freeSlots?.data?.slots?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {freeSlots.data.slots.map((slot, i) => (
                  <button
                    key={i}
                    className="px-2 py-1 text-xs border rounded-md text-blue-600 font-medium border-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => setStartTime(slot.startTime)}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">No available slots</p>
            )}
          </div>
        )}

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