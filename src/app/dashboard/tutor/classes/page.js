'use client'
import ClassTable from "./ClassTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import DeleteClassDialog from "./DeleteDialog";
import { useState } from "react";
import { useClasses } from "@/hooks/tutor/useClass";


export default function TutorClassesPage() {
  const [classes, setClasses] = useState([])
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState('');
  const [type, setType] = useState("");
  const [visibility, setVisibility] = useState("")

  const router = useRouter()
  const redirectToCreateNewClass = () => {
    router.push('/dashboard/tutor/classes/new')
  }


  const { data, isLoading, isError } = useClasses({
    page: 1,
    limit: 10,
    search,
    status,
    type,
    visibility,
  })
console.log(data?.data?.data);


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
            placeholder="Search classes..."
            className="focus-visible:ring-blue-600"
          />
        </div>

        {/* Create Class Button */}
        <Button onClick={redirectToCreateNewClass} className="bg-blue-600 hover:bg-blue-700 text-white">
          + Create Class
        </Button>
      </div>

      {/* Row 3: Table */}
      <div>
        <ClassTable
          data={data?.data}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
