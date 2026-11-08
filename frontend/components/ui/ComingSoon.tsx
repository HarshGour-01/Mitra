import React from "react";
import { Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF0F5] text-[#C94F7C] border border-[#F1DCE5] dark:bg-[#211922] dark:text-[#F09ABB] dark:border-[#493440]",
        className
      )}
    >
      <Clock className="w-3 h-3 text-[#E879A5]" />
      Coming Soon
    </span>
  );
}

export function ComingSoonCard({
  title,
  description,
  expectedRelease = "Phase 2 Roadmap",
  icon: Icon = Sparkles,
}: {
  title: string;
  description: string;
  expectedRelease?: string;
  icon?: any;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#F1DCE5] bg-[#FFF8FA]/60 p-8 text-center transition-all dark:border-[#493440] dark:bg-[#171217]/50">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F5] text-[#C94F7C] shadow-sm dark:bg-[#211922] dark:text-[#F09ABB]">
        <Icon className="h-7 w-7" />
      </div>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8]/80 px-3 py-1 text-xs font-medium text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB]">
        <Clock className="h-3.5 w-3.5" />
        {expectedRelease}
      </div>
      <h4 className="mt-2 text-lg font-bold text-[#30232A] dark:text-[#FFF3F7]">{title}</h4>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#806D76] dark:text-[#C3ADB8]">{description}</p>
      <div className="mt-6">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-xl bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        >
          Backend Integration In Progress
        </button>
      </div>
    </div>
  );
}
