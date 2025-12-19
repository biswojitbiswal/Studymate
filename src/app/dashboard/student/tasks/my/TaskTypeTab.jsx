export function TaskTypeTabs({ value, onChange }) {
  return (
    <div className="border-b border-slate-200 mb-4">
      <div className="flex gap-12">
        <button
          onClick={() => onChange("PRIVATE")}
          className={`pb-2 text-sm font-medium transition
            ${
              value === "PRIVATE"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700 border-b-2 border-transparent hover:border-slate-300"
            }`}
        >
          My Tasks
        </button>

        <button
          onClick={() => onChange("ASSIGNED")}
          className={`pb-2 text-sm font-medium transition
            ${
              value === "ASSIGNED"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700 border-b-2 border-transparent hover:border-slate-300"
            }`}
        >
          Assigned Tasks
        </button>
      </div>
    </div>
  );
}
