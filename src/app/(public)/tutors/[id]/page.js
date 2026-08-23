"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  ExternalLink,
  Link2,
  LoaderCircle,
  Star,
  Users,
} from "lucide-react";
import { useBrowseTutor } from "@/hooks/public/useTutor";

const STATIC_HOURLY_RATE = 800;

export default function TutorDetailsPage() {
  const { id } = useParams();
  const { data: tutor, isLoading, isError, refetch } = useBrowseTutor(id);

  if (isLoading) {
    return <PageState>
      <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-600" />
      <p className="mt-3 text-slate-600">Loading tutor profile…</p>
    </PageState>;
  }

  if (isError || !tutor) {
    return <PageState>
      <p className="font-semibold text-slate-900">Tutor profile could not be loaded.</p>
      <button onClick={refetch} className="mt-4 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Try again</button>
    </PageState>;
  }

  const initials = tutor.name?.split(" ").map((part) => part[0]).join("").slice(0, 2) || "T";

  return <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28">
    <div className="mx-auto max-w-5xl">
      <Link href="/tutors" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600">
        <ArrowLeft className="h-4 w-4" /> Back to tutors
      </Link>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 sm:p-8">
          <ProfileHeader tutor={tutor} initials={initials} />

          <div className="my-7 h-px bg-slate-200" />

          <AboutSection bio={tutor.bio} />

          <ProfileSection title="Subjects">
            <TagList items={tutor.subjects} />
          </ProfileSection>

          <ProfileSection title="Levels">
            <TagList items={tutor.levels} />
          </ProfileSection>

          <StatsPanel tutor={tutor} />

          {tutor.demoLinks?.length > 0 && <ProfileSection title="Demo Links">
            <DemoLinks links={tutor.demoLinks} />
          </ProfileSection>}

          <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Hourly Rate</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">
                ₹{STATIC_HOURLY_RATE}<span className="text-sm font-normal text-slate-500"> / hour</span>
              </p>
            </div>
            <Link href="/classes" className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700">
              Browse classes
            </Link>
          </div>
        </div>
      </article>
    </div>
  </main>;
}

function ProfileHeader({ tutor, initials }) {
  return <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
    <div className="relative h-32 w-32 shrink-0">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-blue-100">
        {tutor.avatar
          ? <Image src={tutor.avatar} alt={tutor.name || "Tutor"} fill className="object-cover" sizes="128px" priority />
          : <span className="flex h-full items-center justify-center text-3xl font-bold text-blue-700">{initials}</span>}
      </div>
      <span className="absolute bottom-2 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500" aria-label="Tutor is active" />
    </div>

    <div className="min-w-0 flex-1">
      <div className="flex min-w-0 items-center gap-2">
        <h1 className="truncate text-3xl font-bold text-slate-950">{tutor.name}</h1>
        <span title="Verified tutor" aria-label="Verified tutor">
          <BadgeCheck className="h-6 w-6 fill-blue-600 text-white" />
        </span>
      </div>
      {tutor.title && <p className="mt-1 text-base font-semibold text-slate-700">{tutor.title}</p>}

      <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600">
        <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
        {tutor.yearsOfExp ?? 0}+ years of experience
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 font-bold text-amber-600">
          <Star className="h-5 w-5 fill-current text-amber-500" />
          {Number(tutor.rating ?? 0).toFixed(1)}
        </span>
        <span className="text-slate-500">({tutor.totalReviews ?? 0} reviews)</span>
        <span className="h-4 w-px bg-slate-300" aria-hidden="true" />
        <span className="font-medium text-slate-600">{tutor.totalStudents ?? 0}+ students</span>
      </div>
    </div>
  </header>;
}

function AboutSection({ bio }) {
  const [expanded, setExpanded] = useState(false);
  const text = bio || "This tutor has not added a biography yet.";
  const canExpand = text.length > 220;

  return <ProfileSection title="About Me">
    <p className={`text-sm leading-7 text-slate-600 ${!expanded && canExpand ? "line-clamp-3" : ""}`}>{text}</p>
    {canExpand && <button type="button" onClick={() => setExpanded((value) => !value)} className="mt-2 cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700">
      {expanded ? "Show less" : "Show more"}
    </button>}
  </ProfileSection>;
}

function ProfileSection({ title, children }) {
  return <section className="mt-7">
    <h2 className="text-sm font-bold text-slate-900">{title}</h2>
    <div className="mt-3">{children}</div>
  </section>;
}

function TagList({ items = [] }) {
  if (!items.length) return <p className="text-sm text-slate-500">Not specified</p>;

  return <div className="flex flex-wrap gap-2">
    {items.map((item) => <span key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700">
      {item}
    </span>)}
  </div>;
}

function StatsPanel({ tutor }) {
  const stats = [
    { label: "Experience", value: `${tutor.yearsOfExp ?? 0}+ Years`, icon: BriefcaseBusiness },
    { label: "Students", value: `${tutor.totalStudents ?? 0}+`, icon: Users },
    { label: "Rating", value: Number(tutor.rating ?? 0).toFixed(1), icon: Star },
  ];

  return <section className="mt-7 grid gap-3 rounded-xl bg-blue-50/70 p-4 sm:grid-cols-3">
    {stats.map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-3 rounded-lg bg-white/60 p-3 sm:bg-transparent sm:p-0">
      <Icon className="h-5 w-5 shrink-0 text-blue-600" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>)}
  </section>;
}

function DemoLinks({ links }) {
  return <div className="flex flex-wrap gap-2">
    {links.map((link, index) => <a
      key={`${link}-${index}`}
      href={link}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
    >
      <Link2 className="h-4 w-4 text-blue-600" />
      Demo {index + 1}
      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
    </a>)}
  </div>;
}

function PageState({ children }) {
  return <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
    <div className="text-center">{children}</div>
  </main>;
}
