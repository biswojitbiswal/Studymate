import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export function TaskTabs({
  range,
  onRangeChange,
  date,
  onDateChange,
}) {
  const tabs = [
    { label: "Today", value: "TODAY" },
    { label: "This Week", value: "WEEK" },
    { label: "All Tasks", value: "ALL" },
  ];

  return (
    <div className="w-full flex items-center justify-between mb-4">
      {/* Range Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onRangeChange(tab.value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition
              ${
                range === tab.value
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-8 px-3 text-sm text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-2"
          >
            <CalendarIcon size={14} />
            {date.toDateString()}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && onDateChange(d)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
