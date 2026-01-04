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


export default function TutorClassesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [visibility, setVisibility] = useState("ALL")

  const router = useRouter()
  const redirectToCreateNewClass = () => {
    router.push('/dashboard/tutor/classes/new')
  }

  const debouncedSearch = useDebounce(search, 400);


  const { data, isLoading, isError } = useClasses({
    page: 1,
    limit: 10,
    search: debouncedSearch,
    status: status === "ALL" ? undefined : status,
    type: type === "ALL" ? undefined : type,
    visibility: visibility === "ALL" ? undefined : visibility,
  })
  // console.log(status);

  const { mutate: publishClass } = usePublishClass();

  function handleClassPublish(id) {
    publishClass(id, {
      onSuccess: () => {
        toast.success("Class published successfully");
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
          "Failed to publish class"
        );
      },
    });
  }


  return (
    <div className="p-6 space-y-6">

      {/* Row 1: Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          My Classes
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all your created classes
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

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-30">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="GROUP">Group</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
          </SelectContent>
        </Select>

        {/* Visibility Filter */}
        <Select value={visibility} onValueChange={setVisibility}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="PUBLIC">Public</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
          </SelectContent>
        </Select>

        {/* Create Class Button */}
        <Button onClick={redirectToCreateNewClass} className="bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer">
          + Create Class
        </Button>
      </div>

      {/* Row 3: Table */}
      <div>
        <ClassTable
          data={data?.data}
          isLoading={isLoading}
          isError={isError}
          page={page}
          setPage={setPage}
          onPublish={handleClassPublish}
        />
      </div>
    </div>
  );
}
