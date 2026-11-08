import React from "react";
import { Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#EDE8FF] text-[#7655E8] border border-[#7655E8]/30 dark:bg-[#241E3D] dark:text-[#EDE8FF] dark:border-[#2E274D]",
        className
      )}
    >
      <Clock className="w-3 h-3 text-[#7655E8]" />
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
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#E8E4DD] bg-white/70 p-10 text-center transition-all dark:border-[#2E274D] dark:bg-[#1A162B]/50 shadow-subtle">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] shadow-sm dark:bg-[#241E3D] dark:text-[#EDE8FF]">
        <Icon className="h-7 w-7" />
      </div>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-semibold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
        <Clock className="h-3.5 w-3.5" />
        {expectedRelease}
      </div>
      <h4 className="mt-3 text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">{title}</h4>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">{description}</p>
      <div className="mt-6">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-xl bg-[#F7F5F0] px-4 py-2 text-xs font-semibold text-[#9290A0] dark:bg-[#12101F] dark:text-[#9290A0]"
        >
          Backend Integration In Progress
        </button>
      </div>
    </div>
  );
}
