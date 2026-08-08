import Link from "next/link";

export default function BecomeTutorCTA() {
  return <section className="mt-10 rounded-2xl bg-blue-600 px-6 py-8 text-center text-white sm:px-10"><h2 className="text-2xl font-bold">Want to teach on StudyMate?</h2><p className="mx-auto mt-2 max-w-xl text-blue-100">Share your knowledge, set your schedule, and help students reach their goals.</p><Link href="/tutor-apply" className="mt-5 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">Become a tutor</Link></section>;
}
