import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

/* shadcn helper */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* ✅ ADD THIS */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
