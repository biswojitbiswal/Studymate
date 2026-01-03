export default function LeaveToolbar({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onAdd
}) {
  return (
    <div className="flex items-center justify-end">
      {/* <div>
        <p className="text-sm text-gray-500">
          Full-day or multi-day leave blocks
        </p>
      </div> */}

      {/* From Date */}
      <input
        type="date"
        value={fromDate || ""}
        onChange={(e) => onFromDateChange(e.target.value)}
        className="
          rounded-md border px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-600
        "
      />

      {/* To Date */}
      <input
        type="date"
        value={toDate || ""}
        onChange={(e) => onToDateChange(e.target.value)}
        className="
          rounded-md border px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-600
        "
      />
      <button
        onClick={onAdd}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        + Add Leave
      </button>
    </div>
  );
}
