"use client";

import { useMemo, useState } from "react";
import BrowseTutorHero from "./BrowseTutorHero";
import BrowseTutorToolbar from "./BrowseTutorToolbar";
import BrowseTutorFilters from "./BrowseTutorFilters";
import BrowseTutorList from "./BrowseTutorList";
import TutorPagination from "./TutorPagination";
import BecomeTutorCTA from "./BecomeTutorCTA";

const DEFAULT_FILTERS = { sortBy: "RECOMMENDED" };
const PAGE_SIZE = 6;

const SUBJECTS = [
  { id: "mathematics", name: "Mathematics" },
  { id: "physics", name: "Physics" },
  { id: "english", name: "English" },
  { id: "programming", name: "Programming" },
];

const LEVELS = [
  { id: "school", name: "School" },
  { id: "college", name: "College" },
  { id: "professional", name: "Professional" },
];

const TUTORS = [
  { id: "1", name: "Aarav Sharma", title: "Mathematics & Physics Tutor", qualification: "M.Sc. Physics, IIT Delhi", yearsOfExp: 8, totalStudents: 320, rating: 4.9, hourlyRate: 1200, subjectId: "mathematics", levelId: "college", bio: "Helping students build strong fundamentals and confidence for board and entrance exams." },
  { id: "2", name: "Priya Nair", title: "English Language Coach", qualification: "M.A. English Literature", yearsOfExp: 6, totalStudents: 245, rating: 4.8, hourlyRate: 800, subjectId: "english", levelId: "school", bio: "Interactive lessons for grammar, writing, speaking, and exam preparation." },
  { id: "3", name: "Rohan Mehta", title: "Programming Instructor", qualification: "B.Tech. Computer Science", yearsOfExp: 7, totalStudents: 410, rating: 4.9, hourlyRate: 1500, subjectId: "programming", levelId: "professional", bio: "Learn web development, JavaScript, Python, and practical coding skills." },
  { id: "4", name: "Sneha Kapoor", title: "Physics Tutor", qualification: "M.Sc. Applied Physics", yearsOfExp: 5, totalStudents: 180, rating: 4.7, hourlyRate: 1000, subjectId: "physics", levelId: "college", bio: "Clear, step-by-step physics lessons tailored to your pace and goals." },
  { id: "5", name: "Vikram Singh", title: "Mathematics Mentor", qualification: "B.Tech. Mechanical Engineering", yearsOfExp: 10, totalStudents: 560, rating: 4.8, hourlyRate: 1800, subjectId: "mathematics", levelId: "school", bio: "Focused coaching for algebra, calculus, and competitive-exam problem solving." },
  { id: "6", name: "Ananya Das", title: "Communication Skills Tutor", qualification: "M.A. Linguistics", yearsOfExp: 4, totalStudents: 130, rating: 4.6, hourlyRate: 700, subjectId: "english", levelId: "professional", bio: "Build confident communication skills for interviews, presentations, and work." },
  { id: "7", name: "Karan Malhotra", title: "Python & Data Tutor", qualification: "M.Tech. Data Science", yearsOfExp: 9, totalStudents: 375, rating: 4.9, hourlyRate: 2000, subjectId: "programming", levelId: "college", bio: "Practical Python, data analysis, and programming support for students." },
];

export default function TutorsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filteredTutors = useMemo(() => {
    const query = search.trim().toLowerCase();
    const tutors = TUTORS.filter((tutor) => {
      const searchableText = `${tutor.name} ${tutor.title} ${tutor.qualification} ${tutor.bio}`.toLowerCase();
      return (!query || searchableText.includes(query))
        && (!filters.subjectId || tutor.subjectId === filters.subjectId)
        && (!filters.levelId || tutor.levelId === filters.levelId)
        && (!filters.experience || matchesExperience(tutor.yearsOfExp, filters.experience))
        && (!filters.minExperience || tutor.yearsOfExp >= filters.minExperience)
        && (!filters.maxExperience || tutor.yearsOfExp <= filters.maxExperience)
        && (!filters.minRating || tutor.rating >= filters.minRating)
        && (filters.minPrice === undefined || tutor.hourlyRate >= filters.minPrice)
        && (filters.maxPrice === undefined || tutor.hourlyRate <= filters.maxPrice);
    });

    return tutors.sort((a, b) => {
      if (filters.sortBy === "HIGHEST_RATED") return b.rating - a.rating;
      if (filters.sortBy === "MOST_STUDENTS") return b.totalStudents - a.totalStudents;
      if (filters.sortBy === "MOST_EXPERIENCED") return b.yearsOfExp - a.yearsOfExp;
      if (filters.sortBy === "NEWEST") return Number(b.id) - Number(a.id);
      return b.rating - a.rating || b.totalStudents - a.totalStudents;
    });
  }, [search, filters]);
  const total = filteredTutors.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const tutors = filteredTutors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeSearch = (value) => { setSearch(value); setPage(1); };
  const changeFilter = (key, value) => { setFilters((current) => ({ ...current, [key]: value })); setPage(1); };
  const resetFilters = () => { setFilters(DEFAULT_FILTERS); setPage(1); };

  return <main className="min-h-screen bg-slate-50 pb-16">
    <div className="mx-auto w-[92%] lg:w-[86%]">
      <BrowseTutorHero />

      <BrowseTutorToolbar search={search} onSearchChange={changeSearch} filters={filters} onFilterChange={changeFilter} subjects={SUBJECTS} levels={LEVELS} onOpenFilters={() => setFiltersOpen(true)} />

      <div className="mt-6 flex gap-6">
        <BrowseTutorFilters filters={filters} onChange={changeFilter} onReset={resetFilters} subjects={SUBJECTS} levels={LEVELS} />

        <section className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
            <span>{`Showing ${tutors.length ? (page - 1) * PAGE_SIZE + 1 : 0}–${Math.min(page * PAGE_SIZE, total)} of ${total} tutors`}</span>
          </div>

          <BrowseTutorList tutors={tutors} />

          <TutorPagination page={page} totalPages={totalPages} onChange={setPage} />
        </section>
      </div>

      <BecomeTutorCTA />
    </div>

    <BrowseTutorFilters mobile open={filtersOpen} onClose={() => setFiltersOpen(false)} filters={filters} onChange={changeFilter} onReset={resetFilters} subjects={SUBJECTS} levels={LEVELS} />
  </main>;
}

function matchesExperience(years, range) {
  if (range === "0-2") return years <= 2;
  if (range === "3-5") return years >= 3 && years <= 5;
  if (range === "6-10") return years >= 6 && years <= 10;
  return years >= 10;
}
