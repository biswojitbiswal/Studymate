"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useStudentResources } from "@/hooks/tutor/useResources";
import { useEnrolledClassContext } from "../EnrolledClassContext";
import ResourcesToolbar from "./ResourcesToolbar";
import ResourcesList from "./ResourcesList";
import { useDebounce } from "@/lib/utils";


export default function ResourcesPage() {

  const { klass } = useEnrolledClassContext()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");
  // const [open, setOpen] = useState(false);

   const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useStudentResources({
    page,
    search: debouncedSearch,
    limit: 10,
    classId: klass?.id
  });

  return (
    <div className="space-y-6">

      <ResourcesToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <ResourcesList
        loading={isLoading}
        data={data?.data?.resources ?? []}
        totalPages={data?.data?.totalPages}
        page={page}
        setPage={setPage}
      />

    </div>
  );
}