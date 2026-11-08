import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "gold" | "violet-glow" | "pink-glow";
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7655E8] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";

    const variants = {
      default:
        "bg-[#7655E8] hover:bg-[#29234B] text-white shadow-md shadow-[#7655E8]/20 hover:shadow-lg hover:shadow-[#7655E8]/30 dark:bg-[#7655E8] dark:hover:bg-[#8F72FA] dark:text-white",
      secondary:
        "bg-[#EDE8FF] hover:bg-[#DDD5FF] text-[#29234B] dark:bg-[#241E3D] dark:hover:bg-[#2F274F] dark:text-[#EDE8FF]",
      outline:
        "border border-[#E8E4DD] hover:border-[#7655E8] bg-white hover:bg-[#EDE8FF]/30 text-[#17152B] dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0] dark:hover:border-[#7655E8] dark:hover:bg-[#241E3D]/50",
      ghost:
        "hover:bg-[#EDE8FF]/50 text-[#17152B] hover:text-[#7655E8] dark:hover:bg-[#241E3D] dark:text-[#F7F5F0] dark:hover:text-[#EDE8FF]",
      destructive:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-sm",
      gold:
        "bg-[#E8C98A] hover:bg-[#DCB870] text-[#17152B] font-bold shadow-md shadow-[#E8C98A]/25",
      "violet-glow":
        "bg-gradient-to-r from-[#7655E8] to-[#29234B] text-white shadow-lg shadow-[#7655E8]/30 hover:shadow-[#7655E8]/50 hover:brightness-105",
      // Legacy alias for pink-glow
      "pink-glow":
        "bg-gradient-to-r from-[#7655E8] to-[#29234B] text-white shadow-lg shadow-[#7655E8]/30 hover:shadow-[#7655E8]/50 hover:brightness-105",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      default: "h-11 px-5 text-sm gap-2",
      lg: "h-13 px-7 text-base gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
