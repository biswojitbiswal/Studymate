export default function MobilePagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="
      md:hidden
      fixed bottom-16 left-0 right-0
      bg-white border-t
      px-4 py-3
      flex items-center justify-between
      z-40
    ">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm font-medium text-gray-700">
        Page {page} / {totalPages || 1}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}