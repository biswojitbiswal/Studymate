"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TutorPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => Math.max(1, Math.min(page - 2, totalPages - 4)) + index);
  return <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Tutor page navigation"><PageButton disabled={page === 1} onClick={() => onChange(page - 1)}><ChevronLeft className="h-4 w-4" /></PageButton>{pages.map((item) => <PageButton key={item} active={item === page} onClick={() => onChange(item)}>{item}</PageButton>)}<PageButton disabled={page === totalPages} onClick={() => onChange(page + 1)}><ChevronRight className="h-4 w-4" /></PageButton></nav>;
}
function PageButton({ children, active, disabled, onClick }) { return <button disabled={disabled} onClick={onClick} className={`flex h-9 min-w-9 items-center justify-center rounded-full border text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"}`}>{children}</button>; }
