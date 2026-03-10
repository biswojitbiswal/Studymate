"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ResourcesToolbar({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <div className="flex items-center gap-3 w-full">

      {/* Search */}
      <Input
        placeholder="Search resources..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-0"
      />

      {/* Add Button */}
      <Button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 shrink-0 hover:cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Add Resource</span>
      </Button>

    </div>
  );
}