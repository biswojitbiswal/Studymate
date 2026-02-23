export default function TimeoffToolbar({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onAdd,
}) {
  return (
    <div className="w-full flex gap-2 items-center">
      {/* From Date */}
      <input
        type="date"
        value={fromDate || ""}
        onChange={(e) => onFromDateChange(e.target.value)}
        className="flex-1 min-w-0 rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>

      {/* To Date */}
      <input
        type="date"
        value={toDate || ""}
        onChange={(e) => onToDateChange(e.target.value)}
        className="flex-1 min-w-0 rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        <span className="sm:hidden">+ Add</span>
        <span className="hidden sm:inline">+ Add Timeoff</span>
      </button>
    </div>
  );
}


// export default function LeaveToolbar({
//   fromDate,
//   toDate,
//   onFromDateChange,
//   onToDateChange,
//   onAdd
// }) {
//   return (
//     <div className="w-full flex items-center gap-2">

//       {/* Dates group */}
//       <div className="flex flex-1 gap-2 min-w-0">

//         {/* From date wrapper */}
//         <div className="flex-1 min-w-0">
//           <input
//             type="date"
//             value={fromDate || ""}
//             onChange={(e) => onFromDateChange(e.target.value)}
//             className="w-full min-w-0 rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//         </div>

//         {/* To date wrapper */}
//         <div className="flex-1 min-w-0">
//           <input
//             type="date"
//             value={toDate || ""}
//             onChange={(e) => onToDateChange(e.target.value)}
//             className="w-full min-w-0 rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//         </div>

//       </div>

//       {/* Button */}
//       <button
//         onClick={onAdd}
//         className="flex-shrink-0 whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//       >
//         + Add
//       </button>

//     </div>
//   );
// }