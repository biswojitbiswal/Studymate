export function TableSkeleton({ rows = 10 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-full rounded-md bg-slate-100 animate-pulse"
        />
      ))}
    </div>
  );
}
