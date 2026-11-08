"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-xl border border-[#F1DCE5] bg-white p-2 dark:border-[#493440] dark:bg-[#2B202A]", className)} />
    );
  }

  return (
    <div className={cn("flex items-center rounded-xl border border-[#F1DCE5] bg-white p-1 shadow-sm dark:border-[#493440] dark:bg-[#2B202A]", className)}>
      <button
        type="button"
        onClick={() => setTheme("light")}
        title="Light theme"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
          theme === "light"
            ? "bg-[#FFF0F5] text-[#C94F7C] shadow-sm"
            : "text-[#806D76] hover:text-[#30232A] dark:text-[#C3ADB8] dark:hover:text-[#FFF3F7]"
        )}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        title="Dark theme"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
          theme === "dark"
            ? "bg-[#211922] text-[#F09ABB] shadow-sm"
            : "text-[#806D76] hover:text-[#30232A] dark:text-[#C3ADB8] dark:hover:text-[#FFF3F7]"
        )}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        title="System preference"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
          theme === "system"
            ? "bg-[#FFF0F5] text-[#C94F7C] dark:bg-[#211922] dark:text-[#F09ABB] shadow-sm"
            : "text-[#806D76] hover:text-[#30232A] dark:text-[#C3ADB8] dark:hover:text-[#FFF3F7]"
        )}
      >
        <Laptop className="h-4 w-4" />
        <span className="sr-only">System</span>
      </button>
    </div>
  );
}
