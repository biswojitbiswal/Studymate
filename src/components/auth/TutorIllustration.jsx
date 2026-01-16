"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TutorIllustration() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center text-white px-8">
      {/* Illustration */}
      <Image
        src="/TutorIllustration.png"
        alt="Tutor teaching illustration"
        width={320}
        height={320}
        priority
        className="mb-6"
      />

      <h2 className="text-3xl font-bold mb-2">
        Teach. Guide. Inspire.
      </h2>

      <p className="text-blue-100 mb-6">
        Create classes, assign tasks, and help students succeed on StudyNest.
      </p>

      <Button
        variant="secondary"
        className="bg-white text-blue-600 hover:bg-blue-50"
        onClick={() => router.push("/register-tutor")}
      >
        Apply as Tutor
      </Button>
    </div>
  );
}
