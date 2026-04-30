import { TableCell, TableRow } from "@/components/ui/table";

export function WalletCardSkeleton() {
  return (
    <div className="flex items-start gap-2 p-4 rounded-xl shadow-sm bg-gray-50 animate-pulse">

      {/* Icon */}
      <div className="p-2.5 rounded-md bg-gray-200">
        <div className="w-[18px] h-[18px] bg-gray-300 rounded"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 w-full">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-5 w-28 bg-gray-300 rounded"></div>
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}


export function WalletTableSkeleton({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          {Array.from({ length: 7 }).map((_, j) => (
            <TableCell key={j} className="py-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}