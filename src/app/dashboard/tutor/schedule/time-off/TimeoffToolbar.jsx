export default function TimeoffToolbar({ 
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onAdd,
}) {
  return (
    <div className="flex items-center justify-end">
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
      {/* Add Button */}
      <button
        onClick={onAdd}
        className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
      >
        + Add Time Off
      </button>
    </div>
  );
}
