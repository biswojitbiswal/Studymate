"use client";

import { createContext, useContext } from "react";

const EnrolledClassContext = createContext(null);

export function EnrolledClassProvider({ value, children }) {
  return (
    <EnrolledClassContext.Provider value={value}>
      {children}
    </EnrolledClassContext.Provider>
  );
}

export function useEnrolledClassContext() {
  const ctx = useContext(EnrolledClassContext);
  if (!ctx) {
    throw new Error("useEnrolledClassContext must be used inside ClassProvider");
  }
  return ctx;
}
