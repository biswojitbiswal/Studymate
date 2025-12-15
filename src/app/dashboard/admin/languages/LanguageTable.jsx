import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteDialog from "./DeleteDialog";
import { SquarePen, Trash2 } from "lucide-react";
import LoadingScreen from "@/components/common/LoadingScreen";
import { TableSkeleton } from "@/components/common/TableSkeleton";

export default function LanguageTable({
    data,
    loading,
    page,
    setPage,
    total,
    onEdit,
}) {


    /* ================= LOADING ================= */
    if (loading) {
        return (
            <div className="border rounded-lg bg-white p-6 text-center text-sm text-slate-500">
                <TableSkeleton />
            </div>
        );
    }

    /* ================= EMPTY ================= */
    if (!data.length) {
        return (
            <div className="border rounded-lg bg-white p-6 text-center text-sm text-slate-500">
                No languages found
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-x-auto bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((language) => (
                        <TableRow key={language.id}>
                            <TableCell className="font-medium">
                                {language.name}
                            </TableCell>

                            <TableCell>{language.slug}</TableCell>
                            <TableCell>{language.priority}</TableCell>

                            {/* ICON */}
                            <TableCell>
                                {language.icon ? (
                                    <img
                                        src={language.icon}
                                        alt={language.name}
                                        className="h-8 w-8 rounded object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-slate-400">
                                        —
                                    </span>
                                )}
                            </TableCell>

                            {/* STATUS */}
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium
                    ${language.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {language.status}
                                </span>
                            </TableCell>

                            {/* ACTIONS */}
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                    <button
                                        onClick={() => onEdit(language)}
                                        className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
                                    >
                                        <SquarePen size={16} />
                                    </button>

                                    {
                                        language.status !== 'ARCHIVED' && (<DeleteDialog language={language}>
                                            <button className="p-2 rounded-md text-red-600 hover:bg-red-100 transition">
                                                <Trash2 size={16} />
                                            </button>
                                        </DeleteDialog>)
                                    }
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* PAGINATION */}
            <div className="flex items-center justify-between p-3 border-t text-sm">
                <span className="text-slate-500">
                    Page {page} of {total}
                </span>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <button
                        disabled={page === total}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
