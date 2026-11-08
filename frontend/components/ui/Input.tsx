import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#F1DCE5] bg-white px-3.5 py-2 text-sm text-[#30232A] transition-colors placeholder:text-[#806D76]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E879A5] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#493440] dark:bg-[#211922] dark:text-[#FFF3F7] dark:placeholder:text-[#C3ADB8]/60 dark:focus-visible:ring-[#F09ABB]",
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
          "flex min-h-[100px] w-full rounded-xl border border-[#F1DCE5] bg-white px-3.5 py-2.5 text-sm text-[#30232A] transition-colors placeholder:text-[#806D76]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E879A5] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#493440] dark:bg-[#211922] dark:text-[#FFF3F7] dark:placeholder:text-[#C3ADB8]/60 dark:focus-visible:ring-[#F09ABB]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
