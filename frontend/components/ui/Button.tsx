import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "pink-glow";
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitra-light-primary disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      default:
        "bg-[#E879A5] hover:bg-[#C94F7C] text-white shadow-md shadow-pink-500/20 dark:bg-[#F09ABB] dark:hover:bg-[#D77A9E] dark:text-[#171217]",
      secondary:
        "bg-[#FFF0F5] hover:bg-[#F8DCE8] text-[#C94F7C] dark:bg-[#211922] dark:hover:bg-[#2B202A] dark:text-[#F09ABB]",
      outline:
        "border border-[#F1DCE5] hover:border-[#E879A5] bg-transparent text-[#30232A] dark:border-[#493440] dark:text-[#FFF3F7] dark:hover:border-[#F09ABB]",
      ghost:
        "hover:bg-[#FFF0F5] text-[#30232A] dark:hover:bg-[#211922] dark:text-[#FFF3F7]",
      destructive:
        "bg-red-500 hover:bg-red-600 text-white",
      "pink-glow":
        "bg-gradient-to-r from-[#E879A5] to-[#C94F7C] text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:brightness-105",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs gap-1.5",
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
