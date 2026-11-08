import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-[#E8E4DD] bg-white px-4 py-2.5 text-sm text-[#17152B] transition-all duration-150 placeholder:text-[#9290A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7655E8] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0] dark:placeholder:text-[#9290A0]/60 dark:focus-visible:ring-[#7655E8]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[110px] w-full rounded-xl border border-[#E8E4DD] bg-white px-4 py-3 text-sm text-[#17152B] transition-all duration-150 placeholder:text-[#9290A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7655E8] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0] dark:placeholder:text-[#9290A0]/60 dark:focus-visible:ring-[#7655E8]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
