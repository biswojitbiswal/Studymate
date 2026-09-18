import { API } from "@/lib/endpoint";
import ClassBrowser from "./ClassBrowser.client";
import { toast } from "sonner";


async function getInitialData(tutorSlug) {
  const tutorFilter = tutorSlug ? `&tutorSlug=${encodeURIComponent(tutorSlug)}` : "";
  const res = await fetch(
    `${process.env.BACKEND_INTERNAL_URL}/api/v1/public/classes/browse?page=1&limit=10&sortBy=createdAt&sortOrder=desc${tutorFilter}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    toast.error("Failed to fetch classes");
  }

  const body = await res.json();
  return body?.data ?? body;
}


export default async function ClassesPage({ searchParams }) {
  const params = await searchParams;
  const tutorSlug = typeof params?.tutor === "string" ? params.tutor : undefined;
  const initialData = await getInitialData(tutorSlug);
  const tutorName = initialData?.data?.items?.[0]?.tutor?.user?.name;

  return (
    <ClassBrowser initialData={initialData} tutorSlug={tutorSlug} tutorName={tutorName} />
  );
}
