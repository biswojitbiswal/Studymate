"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock } from "lucide-react";

export function TaskDetailsModal({ open, task, onClose }) {
  if (!task) return null;

  const isCompleted = task.status === "COMPLETED";
  const isOngoing = task.status === "ONGOING";
  const isPending = task.status === "PENDING";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900">
            Task Details
          </DialogTitle>
          <DialogDescription>
            View complete information about this task.
          </DialogDescription>
        </DialogHeader>

        {/* Title */}
        <div className="mt-4">
          <h2
            className={`text-base font-semibold ${
              isCompleted
                ? "text-slate-400 line-through"
                : "text-slate-900"
            }`}
          >
            {task.title}
          </h2>
        </div>

        {/* Description */}
        {task.description && (
          <div className="mt-3 text-sm text-slate-600 leading-relaxed">
            {task.description}
          </div>
        )}

        {/* Meta Info */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          {/* Status */}
          <div className="flex items-center gap-2">
            <CheckCircle
              size={16}
              className={
                isCompleted ? "text-green-600" : isOngoing ? "text-blue-600" : "text-slate-400"
              }
            />
            <span className="text-slate-500">Status</span>
          </div>
          <Badge
            className={`flext justify-center items-center w-20 ${
              task.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : task.status === "ONGOING"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {task.status}
          </Badge>

          {/* Due Date */}
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-600" />
            <span className="text-slate-500">Due Date</span>
          </div>
          <span className="text-slate-700">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "No deadline"}
          </span>

          {/* Created At */}
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-600" />
            <span className="text-slate-500">Created</span>
          </div>
          <span className="text-slate-700">
            {new Date(task.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Footer Accent */}
        <div className="mt-8 h-1 w-full rounded-full bg-blue-600" />
      </DialogContent>
    </Dialog>
  );
}
