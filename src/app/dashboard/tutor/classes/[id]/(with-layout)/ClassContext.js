"use client";

import { createContext, useContext } from "react";

const ClassContext = createContext(null);

export function ClassProvider({ value, children }) {
  return (
    <ClassContext.Provider value={value}>
      {children}
    </ClassContext.Provider>
  );
}

export function useClassContext() {
  const ctx = useContext(ClassContext);
  if (!ctx) {
    throw new Error("useClassContext must be used inside ClassProvider");
  }
  return ctx;
}
