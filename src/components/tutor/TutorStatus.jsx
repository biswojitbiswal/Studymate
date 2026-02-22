"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function TutorStatusCard({ tutor, onEdit, onDashboard }) {
    const router = useRouter()
  const status = tutor?.tutorStatus;

  const statusConfig = {
    PENDING_REVIEW: {
      label: "Under Review",
      color: "bg-yellow-100 text-yellow-800",
      message:
        "Your tutor application is currently under review by our admin team.",
    },
    APPROVED: {
      label: "Approved",
      color: "bg-green-100 text-green-800",
      message:
        "Congratulations! Your tutor profile has been approved.",
    },
    REJECTED: {
      label: "Rejected",
      color: "bg-red-100 text-red-800",
      message:
        "Your application needs some changes. Please update and resubmit.",
    },
  };

  const cfg = statusConfig[status] || statusConfig.PENDING_REVIEW;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-lg shadow-lg rounded-lg">
        <CardContent className="p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-center gap-4">
            <Image
              src={tutor?.user?.avatar || "/avatar-placeholder.png"}
              alt="Tutor avatar"
              width={180}
              height={180}
              className="h-16 w-16 rounded-full object-cover border"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {tutor?.user?.name}
              </h2>
              <p className="text-sm text-slate-500">
                {tutor?.title}
              </p>
            </div>

            <Badge className={`${cfg.color} px-3 py-1`}>
              {cfg.label}
            </Badge>
          </div>

          {/* MESSAGE */}
          <div className="text-sm text-slate-600">
            {cfg.message}
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Experience</p>
              <p className="font-medium">
                {tutor?.yearsOfExp} years
              </p>
            </div>

            <div>
              <p className="text-slate-400">Subjects</p>
              <p className="font-medium">
                {tutor?.tutorSubjects
                  ?.map((ts) => ts.subject.name)
                  .join(", ")}
              </p>
            </div>

            <div>
              <p className="text-slate-400">Levels</p>
              <p className="font-medium">
                {tutor?.tutorLevels
                  ?.map((tl) => tl.level.name)
                  .join(", ")}
              </p>
            </div>

            <div>
              <p className="text-slate-400">Submitted On</p>
              <p className="font-medium">
                {new Date(tutor?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            {status !== "APPROVED" && (
              <Button
                variant="outline"
                className="flex-1 hover:cursor-pointer bg-blue-600 text-white"
                onClick={onEdit}
              >
                Edit Application
              </Button>
            )}

            {status === "APPROVED" && (
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                onClick={onDashboard}
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
