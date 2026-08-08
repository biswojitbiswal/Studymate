"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const SORT_OPTIONS = [
  ["RECOMMENDED", "Recommended"],
  ["HIGHEST_RATED", "Highest rated"],
  ["MOST_STUDENTS", "Most students"],
  ["MOST_EXPERIENCED", "Most experienced"],
  ["NEWEST", "Newest"],
];

function Select({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value || ""}
      onChange={(event) => onChange(event.target.value || undefined)}
      className={`h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
    >
      {children}
    </select>
  );
}

export default function BrowseTutorToolbar({ search, onSearchChange, filters, onFilterChange, subjects, levels, onOpenFilters }) {
  return (
    <section className="w-full rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search tutors by name, title or keyword..." className="h-11 border-slate-200 pl-10 sm:h-12" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:flex-nowrap">
          <Select value={filters.subjectId} onChange={(value) => onFilterChange("subjectId", value)} className="min-w-0 sm:min-w-36">
            <option value="">All subjects</option>
            {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
          </Select>
          <Select value={filters.levelId} onChange={(value) => onFilterChange("levelId", value)} className="min-w-0 sm:min-w-32">
            <option value="">All levels</option>
            {levels.map((level) => <option key={level.id} value={level.id}>{level.name}</option>)}
          </Select>
          <Select value={filters.sortBy} onChange={(value) => onFilterChange("sortBy", value || "RECOMMENDED")} className="min-w-0 sm:min-w-40">
            {SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>Sort: {label}</option>)}
          </Select>
          <button onClick={onOpenFilters} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 lg:hidden" aria-label="Open tutor filters">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>
    </section>
  );
}
