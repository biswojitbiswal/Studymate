import { Button } from "@/components/ui/button";

export function TaskHeader() {

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Assigned Tasks
        </h1>

        <p className="text-sm text-slate-500">
          Tasks assigned by your tutor
        </p>
      </div>

    </div>
  );
}
