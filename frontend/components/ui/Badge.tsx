import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "verified" | "warning";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default:
      "bg-[#FFF0F5] text-[#C94F7C] border border-[#F1DCE5] dark:bg-[#211922] dark:text-[#F09ABB] dark:border-[#493440]",
    secondary:
      "bg-pink-100 text-[#C94F7C] dark:bg-pink-950/40 dark:text-pink-300",
    outline:
      "border border-[#E879A5] text-[#C94F7C] dark:border-[#F09ABB] dark:text-[#F09ABB]",
    success:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
    verified:
      "bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-[#C94F7C] border border-[#E879A5]/40 font-semibold dark:text-[#F09ABB]",
    warning:
      "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
