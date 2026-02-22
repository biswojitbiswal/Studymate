const DAYS = [
  { label: "All", value: "ALL" },
  { label: "Sunday", value: "SUN" },
  { label: "Monday", value: "MON" },
  { label: "Tuesday", value: "TUE" },
  { label: "Wednesday", value: "WED" },
  { label: "Thursday", value: "THU" },
  { label: "Friday", value: "FRI" },
  { label: "Saturday", value: "SAT" },
];


export default function AvailabilityToolbar({
  search,
  onSearchChange,
  onAdd,
  day,
  onDayChange
}) {
  return (
    <div className="flex items-center justify-between lg:justify-end gap-2 flex-1">

      {/* Filter Dropdown */}
      <div className="flex items-center gap-2 w-1/2 lg:w-auto">
        <select
          value={day}
          onChange={(e) => onDayChange(e.target.value)}
          className="w-full rounded-md border px-4 lg:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="" disabled hidden>
            Select Day
          </option>

          {DAYS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="w-1/2 lg:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-blue-700"
      >
        + Add Availability
      </button>

    </div>
  );
}
