export default function TimeoffToolbar({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onAdd,
}) {
  return (
    <div className="grid grid-cols-3 gap-2 lg:flex lg:items-center lg:justify-between">
      {/* From Date */}
      <input
        type="date"
        value={fromDate || ""}
        onChange={(e) => onFromDateChange(e.target.value)}
        className="
        w-full
        rounded-md border px-1.5 lg:px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-600"/>

      {/* To Date */}
      <input
        type="date"
        value={toDate || ""}
        onChange={(e) => onToDateChange(e.target.value)}
        className="
    w-full
    rounded-md border px-1.5 lg:px-3 py-2 text-sm
    focus:outline-none focus:ring-2 focus:ring-blue-600"/>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap rounded-md"
      >
        <span className="hidden xs:inline">+ Add</span>
        <span className="xs:hidden">+ Add</span>
        <span className="hidden sm:inline"> Timeoff</span>
      </button>
    </div>
  );
}
