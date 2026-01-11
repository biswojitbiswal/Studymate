"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StudentIllustration() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center text-white px-8">
      <Image
        src="/StudentIllustration.png"
        alt="Student studying illustration"
        width={320}
        height={320}
        priority
        className="mb-6"
      />

      <h2 className="text-3xl font-bold mb-2">
        Study smarter, not harder
      </h2>

      <p className="text-blue-100 mb-6">
        Track tasks, join classes, and stay consistent with Studymate.
      </p>

      <Button
        variant="secondary"
        className="bg-white text-blue-600 hover:bg-blue-50"
        onClick={() => router.push("/register-student")}
      >
        Sign up as Student
      </Button>
    </div>
  );
}
