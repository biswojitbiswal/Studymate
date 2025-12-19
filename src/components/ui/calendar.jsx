"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4 text-blue-600",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold text-slate-800",
        nav: "space-x-1 flex items-center",
        nav_button:
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-blue-100 rounded-md",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-8 font-medium text-xs text-center",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day:
          "h-8 w-8 p-0 font-normal rounded-md hover:bg-blue-100 transition",
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600",
        day_today:
          "border border-blue-600 text-blue-600",
        day_outside: "text-slate-300 opacity-50",
        day_disabled: "text-slate-300 opacity-50",
        day_range_middle:
          "aria-selected:bg-blue-100 aria-selected:text-blue-700",
        day_hidden: "invisible",
      }}

      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (<div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />);
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (<ChevronLeftIcon className={cn("size-4", className)} {...props} />);
          }

          if (orientation === "right") {
            return (<ChevronRightIcon className={cn("size-4", className)} {...props} />);
          }

          return (<ChevronDownIcon className={cn("size-4", className)} {...props} />);
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div
                className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props} />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props} />
  );
}

export { Calendar, CalendarDayButton }
