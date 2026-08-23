"use client";

import { useMemo, useState } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useDebounce } from "@/lib/utils";
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { useBrowseTutors } from "@/hooks/public/useTutor";
import BrowseTutorHero from "./BrowseTutorHero";
import BrowseTutorToolbar from "./BrowseTutorToolbar";
import BrowseTutorFilters from "./BrowseTutorFilters";
import BrowseTutorList from "./BrowseTutorList";
import TutorPagination from "./TutorPagination";
import BecomeTutorCTA from "./BecomeTutorCTA";

const DEFAULT_FILTERS = { sortBy: "RECOMMENDED" };
const PAGE_SIZE = 10;

export default function TutorsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const debouncedSearch = useDebounce(search.trim(), 400);

  const { data: subjects = [] } = usePublicSubjects();
  const { data: levels = [] } = usePublicLevels();
  const params = useMemo(() => ({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    subjectId: filters.subjectId || undefined,
    levelId: filters.levelId || undefined,
    minExperience: filters.minExperience,
    maxExperience: filters.maxExperience,
    minRating: filters.minRating,
    sortBy: filters.sortBy || "RECOMMENDED",
  }), [debouncedSearch, filters, page]);

  const { data: result, isLoading, isFetching, isError, refetch } = useBrowseTutors(params);
  const tutors = Array.isArray(result?.data) ? result.data : [];
  const total = result?.totalTutor ?? 0;
  const totalPages = result?.totalPages ?? 0;

  const changeSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const changeFilter = (key, value) => {
    setFilters((current) => {
      if (key !== "experience") return { ...current, [key]: value };
      return { ...current, experience: value, ...experienceRange(value) };
    });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  return <main className="min-h-screen bg-slate-50 pb-16">
    <div className="mx-auto w-[92%] lg:w-[86%]">
      <BrowseTutorHero />

      <BrowseTutorToolbar search={search} onSearchChange={changeSearch} filters={filters} onFilterChange={changeFilter} subjects={subjects} levels={levels} filtersOpen={filtersOpen} onToggleFilters={() => setFiltersOpen((open) => !open)} />

      <div className="mt-6 flex gap-6">
        {filtersOpen && <BrowseTutorFilters filters={filters} onChange={changeFilter} onReset={resetFilters} subjects={subjects} levels={levels} />}

        <section className="min-w-0 flex-1" aria-busy={isFetching}>
          <div className="mb-4 flex min-h-6 items-center justify-between text-sm text-slate-600">
            <span>{isLoading ? "Finding tutors…" : `Showing ${tutors.length ? (page - 1) * PAGE_SIZE + 1 : 0}–${Math.min(page * PAGE_SIZE, total)} of ${total} tutors`}</span>
            {isFetching && !isLoading && <LoaderCircle className="h-4 w-4 animate-spin text-blue-600" aria-label="Updating tutor results" />}
          </div>

          {isLoading ? <TutorListSkeleton /> : isError ? <LoadError onRetry={refetch} /> : <BrowseTutorList tutors={tutors} />}
          {!isError && <TutorPagination page={page} totalPages={totalPages} onChange={setPage} />}
        </section>
      </div>

      <BecomeTutorCTA />
    </div>

    <BrowseTutorFilters mobile open={filtersOpen} onClose={() => setFiltersOpen(false)} filters={filters} onChange={changeFilter} onReset={resetFilters} subjects={subjects} levels={levels} />
  </main>;
}

function experienceRange(value) {
  if (value === "0-2") return { minExperience: 0, maxExperience: 2 };
  if (value === "3-5") return { minExperience: 3, maxExperience: 5 };
  if (value === "6-10") return { minExperience: 6, maxExperience: 10 };
  if (value === "10+") return { minExperience: 10, maxExperience: undefined };
  return { minExperience: undefined, maxExperience: undefined };
}

function TutorListSkeleton() {
  return <div className="space-y-4" aria-label="Loading tutors">
    {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-44 animate-pulse rounded-2xl border border-slate-100 bg-white p-5"><div className="flex h-full items-center gap-5"><div className="h-28 w-28 shrink-0 rounded-full bg-slate-200" /><div className="flex-1 space-y-3"><div className="h-5 w-2/5 rounded bg-slate-200" /><div className="h-4 w-1/3 rounded bg-slate-100" /><div className="h-4 w-3/5 rounded bg-slate-100" /></div></div></div>)}
  </div>;
}

function LoadError({ onRetry }) {
  return <div className="rounded-2xl border border-red-100 bg-white p-10 text-center"><AlertCircle className="mx-auto h-8 w-8 text-red-500" /><p className="mt-3 font-semibold text-slate-900">We couldn’t load the tutors.</p><button onClick={onRetry} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Try again</button></div>;
}
