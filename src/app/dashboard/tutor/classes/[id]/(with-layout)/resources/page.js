"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { useResources } from "@/hooks/tutor/useResources";

import ResourcesToolbar from "./ResourcesToolbar";
import ResourcesList from "./ResourcesList";
import CreateResourceDialog from "./CreateResourceDialog";
import { useClassContext } from "../ClassContext";
import EditResourceDialog from "./EditResourceDialog";
import DeleteResourceDialog from "./DeleteResourceDialog";
import { useDebounce } from "@/lib/utils";

export default function ResourcesPage() {

  const { klass } = useClassContext()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editResource, setEditResource] = useState(null);

   const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useResources(klass?.id, {
    page,
    search: debouncedSearch,
    limit: 10,
  });


  return (
    <div className="space-y-6">

      <ResourcesToolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => setOpen(true)}
      />

      <ResourcesList
        loading={isLoading}
        data={data?.data?.resources ?? []}
        totalPages={data?.data?.totalPages}
        page={page}
        setPage={setPage}
        // onView={(r) => setPreviewResource(r)}
        onEdit={(r) => setEditResource(r)}
        onDelete={(id) => setDeleteId(id)}
      />

      {open && (
        <CreateResourceDialog
          open={open}
          onClose={() => setOpen(false)}
          classId={klass?.id}
        />
      )}

      {editResource && (
        <EditResourceDialog
          open={!!editResource}
          resource={editResource}
          onClose={() => setEditResource(null)}
        />
      )}

      {deleteId && (
        <DeleteResourceDialog
          open={!!deleteId}
          resourceId={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}

      {/* {deleteId && (
        <DeleteResourceDialog
          open={!!deleteId}
          resourceId={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )} */}

    </div>
  );
}