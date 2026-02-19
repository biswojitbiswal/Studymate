'use client'
import ClassTable from "./ClassTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useClasses, usePublishClass } from "@/hooks/tutor/useClass";
import { useDebounce } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useEnrolledClasses } from "@/hooks/student/useClass";


export default function StudentClassesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [visibility, setVisibility] = useState("ALL")

  const router = useRouter()

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useEnrolledClasses({
    page: 1,
    limit: 10,
    search: debouncedSearch,
  })



  return (
    <div className="p-6 space-y-6">

      {/* Row 1: Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          My Enrolled Classes
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all your enrolled classes
        </p>
      </div>

      {/* Row 2: Search + Action */}
      <div className="flex items-center justify-between gap-4">

        {/* Search Bar */}
        <div className="w-full flex-1">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes..."
            className="focus-visible:ring-blue-600"
          />
        </div>
      </div>

      <div>
        <ClassTable
          data={data?.data?.classes}
          isLoading={isLoading}
          isError={isError}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
