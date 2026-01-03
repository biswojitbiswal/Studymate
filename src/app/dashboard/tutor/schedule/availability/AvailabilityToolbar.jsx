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
    <div className="flex items-center justify-end gap-4">
      {/* Search */}
      {/* <input
        type="text"
        placeholder="Search by day or time..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      /> */}

      {/* Filter Dropdown */}
      <div className="flex items-center gap-2">
        {/* <label className="text-sm text-gray-600">Day</label> */}

        <select
          value={day}
          onChange={(e) => onDayChange(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
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
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        + Add Availability
      </button>
    </div>
  );
}
