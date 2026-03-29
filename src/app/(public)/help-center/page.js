"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const faqs = [
  {
    q: "How do I create a class?",
    a: "Go to dashboard → click 'Create Class' → fill details and save.",
  },
  {
    q: "How can I add students?",
    a: "Open a class → click 'Add Student' → enter student details.",
  },
  {
    q: "How to reset password?",
    a: "Go to settings → change password or use forgot password.",
  },
];

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const router = useRouter()

  return (
    <div className="max-w-2xl min-h-screen mx-auto px-4 py-6 pt-26 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg backdrop-blur-sm transition shrink-0 hover:cursor-pointer border border-gray-400"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div>
        <h1 className="text-xl font-semibold">Help Center</h1>
        <p className="text-sm text-gray-500">
          Find answers to common questions.
        </p>
      </div>

      <div className="bg-white border rounded-xl divide-y">
        {faqs.map((item, i) => (
          <div key={i} className="p-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left text-sm font-medium"
            >
              {item.q}
            </button>

            {openIndex === i && (
              <p className="text-sm text-gray-600 mt-2">{item.a}</p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}