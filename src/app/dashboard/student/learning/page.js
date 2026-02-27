'use client'
import ClassTable from "./ClassTable";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "@/lib/utils";
import { useEnrolledClasses } from "@/hooks/student/useClass";
import { ArrowLeft, Badge, Compass } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MdExplore } from "react-icons/md";


const statusStyles = {
  PUBLISHED: "bg-green-100 text-green-700",
  ACTIVE: "bg-blue-100 text-blue-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  ARCHIVED: "bg-red-100 text-red-700",
};


export default function StudentClassesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [visibility, setVisibility] = useState("ALL")

  const router = useRouter()

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useEnrolledClasses({
    page: 1,
    limit: 10,
    search: debouncedSearch,
  })



  return (
    <div className="p-0 lg:px-6 space-y-3 lg:space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer mb-2"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Row 1: Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          My Enrolled Classes
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all your enrolled classes
        </p>
      </div>

      {/* Row 2: Search + Action */}
      <div className="flex items-center justify-between gap-4">

        {/* Search Bar */}
        <div className="w-full flex-1">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes..."
            className="focus-visible:ring-blue-600"
          />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {data?.data?.classes?.map((cls) => {
          const joiningStart = cls?.enrollments[0]?.enrolledAt?.split("T")[0];
          const startDate = cls?.startDate?.split("T")[0];

          return (
            <Link
              key={cls?.id}
              href={`/dashboard/tutor/learning/${cls?.id}`}
              className="block"
            >
              <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">

                {/* STATUS STRIP */}
                <div
                  className={`absolute top-0 left-0 h-full w-1.5 bg-blue-600
                ${statusStyles[cls?.status]?.replace("text", "bg") || "bg-blue-600"}`}
                />

                {/* CONTENT */}
                <div className="flex flex-col sm:flex-row">

                  {/* LEFT — THUMBNAIL */}
                  <div className="relative w-full sm:w-44 h-40 sm:h-auto bg-gray-100 shrink-0">
                    <Image
                      src={cls?.previewImg || "/placeholder-class.jpg"}
                      alt={cls?.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* RIGHT — DETAILS */}
                  <div className="flex-1 p-4 space-y-3">

                    {/* TITLE + SWITCH */}
                    <div className="flex justify-between gap-1.5">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
                          {cls?.title}
                        </h3>

                        {/* TYPE + VISIBILITY */}
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            {cls?.type}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded ${cls?.visibility === "PUBLIC"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                              }`}
                          >
                            {cls?.visibility}
                          </span>

                          {/* <span className={`px-2 py-0.5 rounded text-xs`}>
                            {cls?.tutor?.user?.name}
                          </span> */}
                        </div>
                      </div>
                    </div>

                    {/* META INFO */}
                    <div className="grid grid-cols-2 gap-y-2 text-sm pt-1">

                      <div className="text-gray-500">Joining</div>
                      <div className="text-right font-medium text-gray-800">
                        {joiningStart}
                      </div>

                      <div className="text-gray-500">Start Date</div>
                      <div className="text-right font-medium text-gray-800">
                        {startDate}
                      </div>

                      {/* <div className="text-gray-500">Price</div>
                      <div className="text-right font-semibold text-blue-600">
                        ₹{cls?.price?.toFixed(2)}
                      </div> */}
                    </div>

                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* MOBILE PAGINATION */}
        <div className="flex items-center justify-between gap-2 p-3 border-t text-sm">
          <span className="text-slate-500">
            Page {page} of {data?.data?.totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              disabled={page === data?.data?.totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      <div className="hidden md:block ">
        <ClassTable
          data={data?.data?.classes}
          isLoading={isLoading}
          isError={isError}
          page={page}
          totalPages={data?.data?.totalPages}
          setPage={setPage}
        />
      </div>

      <Link
        href="/classes"
        className="
        md:hidden
        fixed right-4 bottom-20
        flex items-center gap-2
        text-blue-600 p-1 bg-gray-100 rounded-full
        shadow-lg
        transition-all duration-200
        z-50
      "
      >
        <MdExplore size={44} />
        {/* <span className="text-sm font-medium">Explore</span> */}
      </Link>
    </div>
  );
}
