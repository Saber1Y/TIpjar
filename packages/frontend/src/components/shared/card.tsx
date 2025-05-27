import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const cardVariants = cva("rounded-2xl bg-white transition-all", {
    variants: {
        variant: {
            default: "shadow-lg hover:shadow-xl",
            flat: "border border-gray-100",
            elevated: "shadow-xl hover:shadow-2xl",
        },
        padding: {
            none: "",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
        },
    },
    defaultVariants: {
        variant: "default",
        padding: "md",
    },
});

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {
    as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, as: Component = "div", ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={cn(cardVariants({ variant, padding, className }))}
                {...props}
            />
        );
    },
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-2xl font-bold text-gray-900", className)}
        {...props}
    />
));

CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-gray-600", className)} {...props} />
));

CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));

CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
));

CardFooter.displayName = "CardFooter";
