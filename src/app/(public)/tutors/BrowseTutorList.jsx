import TutorCard from "./TutorCard";

export default function BrowseTutorList({ tutors }) {
  if (!tutors.length) return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">No tutors match these filters.</div>;
  return <div className="space-y-4">{tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)}</div>;
}
