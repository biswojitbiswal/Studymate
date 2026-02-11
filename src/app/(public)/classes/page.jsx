import { API } from "@/lib/endpoint";
import ClassBrowser from "./ClassBrowser.client";
import { toast } from "sonner";


async function getInitialData() {
  const res = await fetch(
    "http://localhost:3000/api/v1/public/classes/browse?page=1&limit=10&sortBy=createdAt&sortOrder=desc",
    { cache: "no-store" }
  );

  if (!res.ok) {
    toast.error("Failed to fetch classes");
  }

  return res.json();
}


export default async function ClassesPage() {
  const initialData = await getInitialData();

  return (
    <ClassBrowser initialData={initialData} />
  );
}
