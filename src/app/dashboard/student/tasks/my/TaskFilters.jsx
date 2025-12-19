export function TaskFilters({ search, onSearchChange, status, onStatusChange }) {
  const statuses = [
    { label: "All", value: "ALL" },
    { label: "Todo", value: "TODO" },
    { label: "Ongoing", value: "ONGOING" },
    { label: "Completed", value: "COMPLETED" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="border rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      {/* Status filters */}
      <div className="flex gap-2">
        {statuses.map((s, i) => (
          <button
            key={s.value}
            onClick={() => onStatusChange(s.value)}
            className={`px-3 py-1 rounded-md text-sm
              ${status === s.value
                ? "bg-blue-600 text-white"
                : "border text-slate-600 hover:bg-blue-100"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
