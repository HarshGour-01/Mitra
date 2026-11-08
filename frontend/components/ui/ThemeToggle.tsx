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
      <div className={cn("h-9 w-9 rounded-xl border border-[#E8E4DD] bg-white p-2 dark:border-[#2E274D] dark:bg-[#1A162B]", className)} />
    );
  }

  return (
    <div className={cn("flex items-center rounded-xl border border-[#E8E4DD] bg-white p-1 shadow-subtle dark:border-[#2E274D] dark:bg-[#1A162B]", className)}>
      <button
        type="button"
        onClick={() => setTheme("light")}
        title="Light theme"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
          theme === "light"
            ? "bg-[#EDE8FF] text-[#7655E8] shadow-xs"
            : "text-[#555366] hover:text-[#17152B] dark:text-[#9290A0] dark:hover:text-[#F7F5F0]"
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
            ? "bg-[#241E3D] text-[#EDE8FF] shadow-xs"
            : "text-[#555366] hover:text-[#17152B] dark:text-[#9290A0] dark:hover:text-[#F7F5F0]"
        )}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        title="System theme"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
          theme === "system"
            ? "bg-[#EDE8FF] text-[#7655E8] shadow-xs dark:bg-[#241E3D] dark:text-[#EDE8FF]"
            : "text-[#555366] hover:text-[#17152B] dark:text-[#9290A0] dark:hover:text-[#F7F5F0]"
        )}
      >
        <Laptop className="h-3.5 w-3.5" />
        <span className="sr-only">System</span>
      </button>
    </div>
  );
}
