"use client";

import { ChevronDown, Star, X } from "lucide-react";

const EXPERIENCE_OPTIONS = [
  ["0-2", "0–2 years"],
  ["3-5", "3–5 years"],
  ["6-10", "6–10 years"],
  ["10+", "10+ years"],
];
const RATING_OPTIONS = [4, 3, 2, 1];

const SORT_OPTIONS = [
  ["RECOMMENDED", "Recommended"],
  ["HIGHEST_RATED", "Highest rated"],
  ["MOST_STUDENTS", "Most students"],
  ["MOST_EXPERIENCED", "Most experienced"],
  ["NEWEST", "Newest"],
];

export default function BrowseTutorFilters({
  filters, onChange, onReset, subjects, levels, open, onClose, mobile = false
}) {
  const applyFilters = () => onClose?.();
  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
        <button onClick={onReset} className="text-sm font-semibold text-blue-600 hover:text-blue-700">Reset</button>
        {mobile && <button onClick={onClose} className="rounded-md p-1 text-slate-500 hover:bg-slate-100" aria-label="Close filters"><X className="h-5 w-5" /></button>}
      </div>

      <FilterGroup label="Subjects">
        <FilterSelect value={filters.subjectId} onChange={(value) => onChange("subjectId", value)} placeholder="Select subject" options={subjects} />
      </FilterGroup>

      <FilterGroup label="Level">
        <FilterSelect value={filters.levelId} onChange={(value) => onChange("levelId", value)} placeholder="Select level" options={levels} />
      </FilterGroup>

      <FilterGroup label="Experience">
        <FilterSelect value={filters.experience} onChange={(value) => onChange("experience", value)} placeholder="Select experience" options={EXPERIENCE_OPTIONS.map(([id, name]) => ({ id, name }))} />
      </FilterGroup>

      <FilterGroup label="Sort by">
        <FilterSelect value={filters.sortBy} onChange={(value) => onChange("sortBy", value || "RECOMMENDED")} placeholder="Select sorting" options={SORT_OPTIONS.map(([id, name]) => ({ id, name }))} />
      </FilterGroup>

      <FilterGroup label="Rating">
        <div className="grid grid-cols-2 gap-2">
          {RATING_OPTIONS.map((rating) => <button key={rating} onClick={() => onChange("minRating", filters.minRating === rating ? undefined : rating)} className={`flex h-8 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium ${filters.minRating === rating ? "border-blue-200 bg-blue-50 text-slate-700" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}><Star className={`h-3.5 w-3.5 ${filters.minRating === rating ? "fill-blue-600 text-blue-600" : "fill-slate-300 text-slate-300"}`} /> {rating} & above</button>)}
        </div>
      </FilterGroup>

      <button onClick={applyFilters} className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700">Apply Filters</button>
    </div>
  );

  if (mobile) return open ?
    <>
      <div className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={onClose} />
      <aside id="tutor-filters-mobile" className="fixed inset-y-0 left-0 z-50 w-[min(22rem,90vw)] overflow-y-auto bg-white p-5 shadow-2xl lg:hidden">{content}
      </aside>
    </> : null;

  return <aside id="tutor-filters" className="hidden h-fit w-78 shrink-0 rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:block">{content}</aside>;
}

function FilterGroup({ label, children }) { return <div><h3 className="mb-3 text-sm font-bold text-slate-800">{label}</h3>{children}</div>; }

function FilterSelect({ value, onChange, placeholder, options }) {
  return <div className="relative">
    <select value={value ?? ""} onChange={(event) => onChange(event.target.value || undefined)} className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"><option value="">{placeholder}
    </option>{options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
  </div>;
}
