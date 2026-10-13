"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border bg-surface shrink-0" />
    );
  }


  function toggle() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground hover:bg-surface-muted transition-colors"
      title={`Theme: ${theme || "system"} (Click to cycle Light -> Dark -> System)`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-primary" />
      ) : theme === "light" ? (
        <Sun className="h-4 w-4 text-warning" />
      ) : (
        <Laptop className="h-4 w-4" />
      )}
    </button>
  );
}
