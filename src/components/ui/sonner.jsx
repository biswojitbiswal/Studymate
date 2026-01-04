"use client";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: "#2563eb", // blue-600
          color: "white",
        },
      }}
    />
  );
}
