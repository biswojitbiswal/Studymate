"use client";

import { useEffect, useState } from "react";
import { TaskFilters } from "./TaskFilters";
import { TaskHeader } from "./TaskHeader";
import { TaskPagination } from "./TaskPagination";
import { TaskTabs } from "./TaskTabs";
import { TaskTypeTabs } from "./TaskTypeTab";
import { useCompleteTask, useCreateTask, useDeleteTask, useTasks, useUpdateTask } from "@/hooks/student/useTask";
import { CreateTaskModal } from "./CreateTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { toast } from "sonner";
import { TaskDetailsModal } from "./TaskDetails";
import { TaskList } from "./TaskList";

export default function TasksPage() {
  const [taskType, setTaskType] = useState("PRIVATE"); // PRIVATE | ASSIGNED
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState('ALL');
  const [range, setRange] = useState('TODAY');
  const [date, setDate] = useState(new Date());

  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showDetail, setShowDetail] = useState(null)


  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);          // reset pagination
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError } = useTasks({
    page,
    limit: 10,
    search,
    status,
    range,
    date,
  })

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTaskMutation = useDeleteTask({ page, limit: 10, search });

  const completeTask = useCompleteTask();



  const handleCreateTask = (data) => {
    createTask.mutate(data, {
      onSuccess: () => {
        toast.success("Task created successfully");
        setCreateOpen(false);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Failed to create task"
        );
      },
    });
  };


  const handleUpdateTask = (id, formData) => {
    updateTask.mutate(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          setEditTask(null); // close modal
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to update task"
          );
        },
      }
    );
  };


  const handleComplete = (taskId, status) => {
    console.log("Debugging");

    if (status === "COMPLETED") return;

    completeTask.mutate(
      { id: taskId },
      {
        onSuccess: () => {
          toast.success("Task completed");
        },
        onError: (err) => {
          console.log(err);
          toast.error("Failed to complete task");
        },
      }
    );
  };


  const handleDeleteConfirm = () => {
    if (!deleteTaskId) return;

    deleteTaskMutation.mutate(deleteTaskId, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
        setDeleteTaskId(null); // close dialog
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Failed to delete task"
        );
      },
    });
  };


  return (
    <div className="max-w-5xl mx-auto">
      {/* <TaskTypeTabs value={taskType} onChange={setTaskType} /> */}

      <TaskHeader
        taskType={taskType}
        onAddTask={() => setCreateOpen(true)}
      />

      <TaskTabs
        range={range}
        onRangeChange={setRange}
        date={date}
        onDateChange={setDate}
      />

      <TaskFilters
        search={searchInput}
        onSearchChange={(val) => setSearchInput(val)}
        status={status}
        onStatusChange={(val) => {
          setPage(1);
          setStatus(val);
        }}
      />

      <TaskList
        tasks={data?.data?.data || []}
        isLoading={isLoading}
        isError={isError}
        onEdit={(task) => setEditTask(task)}
        onDelete={(id) => setDeleteTaskId(id)} // ✅ store id
        onComplete={handleComplete}
        onView={(task) => setShowDetail(task)}
      />


      <TaskPagination
        page={page}
        totalPages={data?.data?.totalPages}
        onPageChange={setPage}
      />

      <TaskDetailsModal
        open={!!showDetail}
        task={showDetail}
        onClose={() => setShowDetail(null)}
      />

      {/* 🔥 Create Task Modal */}
      <CreateTaskModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateTask}
      />


      <EditTaskModal
        open={!!editTask}
        task={editTask}
        onClose={() => setEditTask(null)}
        onSubmit={handleUpdateTask}
      />

      <DeleteTaskDialog
        open={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteTaskMutation.isPending}
      />


    </div>
  );
}
