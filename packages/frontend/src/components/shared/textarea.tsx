import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textareaVariants = cva(
    "w-full rounded-lg border bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "border-gray-200 focus:border-purple-500 focus:ring-purple-500",
                error: "border-red-500 focus:border-red-500 focus:ring-red-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant, label, error, helperText, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        textareaVariants({
                            variant: error ? "error" : variant,
                            className,
                        }),
                    )}
                    ref={ref}
                    {...props}
                />
                {(error || helperText) && (
                    <p
                        className={cn(
                            "text-sm",
                            error ? "text-red-500" : "text-gray-500",
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    },
);

Textarea.displayName = "Textarea";
