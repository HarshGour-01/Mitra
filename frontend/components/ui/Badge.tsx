import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "verified" | "warning" | "gold";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default:
      "bg-[#EDE8FF] text-[#29234B] border border-[#EDE8FF] dark:bg-[#241E3D] dark:text-[#EDE8FF] dark:border-[#2E274D]",
    secondary:
      "bg-[#F7F5F0] text-[#555366] border border-[#E8E4DD] dark:bg-[#211C36] dark:text-[#9290A0] dark:border-[#2E274D]",
    outline:
      "border border-[#7655E8]/40 text-[#7655E8] bg-transparent dark:border-[#7655E8]/60 dark:text-[#EDE8FF]",
    success:
      "bg-emerald-50 text-[#329B75] border border-emerald-200/80 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
    verified:
      "bg-[#EDE8FF] text-[#7655E8] border border-[#7655E8]/30 font-semibold shadow-xs dark:bg-[#241E3D] dark:text-[#EDE8FF] dark:border-[#7655E8]/50",
    gold:
      "bg-[#E8C98A]/20 text-[#9B7020] border border-[#E8C98A]/50 font-bold dark:bg-[#E8C98A]/15 dark:text-[#E8C98A] dark:border-[#E8C98A]/40",
    warning:
      "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
