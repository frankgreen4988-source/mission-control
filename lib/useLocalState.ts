"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`mc_${key}`);
      if (stored) setState(JSON.parse(stored));
    } catch {}
  }, [key]);

  const setValue = (val: T | ((prev: T) => T)) => {
    setState((prev) => {
      const next = typeof val === "function" ? (val as (p: T) => T)(prev) : val;
      try {
        localStorage.setItem(`mc_${key}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return [state, setValue];
}
