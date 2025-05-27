import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary:
                    "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 focus:ring-purple-500",
                secondary:
                    "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 focus:ring-purple-500",
                ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
                danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
            },
            size: {
                sm: "px-4 py-2 text-sm",
                md: "px-6 py-3 text-base",
                lg: "px-8 py-4 text-lg",
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            fullWidth: false,
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            fullWidth,
            isLoading,
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                className={cn(
                    buttonVariants({ variant, size, fullWidth, className }),
                )}
                ref={ref}
                disabled={isLoading}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon && (
                    <span className="mr-2">{leftIcon}</span>
                )}
                {children}
                {!isLoading && rightIcon && (
                    <span className="ml-2">{rightIcon}</span>
                )}
            </button>
        );
    },
);

Button.displayName = "Button";
