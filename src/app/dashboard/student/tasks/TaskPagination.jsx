export function TaskPagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;
// console.log(totalPages);

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      
      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-2 rounded-md border text-sm transition
          ${
            page === 1
              ? "opacity-50 cursor-not-allowed text-blue-600"
              : "hover:bg-blue-100"
          }`}
      >
        ←
      </button>

      {/* Page info */}
      <span className="text-sm text-slate-600">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </span>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-2 rounded-md border text-sm transition
          ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed text-blue-600"
              : "hover:bg-blue-100"
          }`}
      >
        →
      </button>
    </div>
  );
}
