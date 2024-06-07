import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "rounded-full border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "rounded-full border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "rounded-full border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "rounded-full text-foreground",
        success: "rounded-full border-transparent bg-emerald-500 text-primary-foreground hover:bg-destructive/80",
        notification:
          "rounded-full bg-blue-500 text-primary-foreground hover:bg-primary/80",
        reminder:
          "bg-gray-500 drop-shadow-md text-primary-foreground hover:bg-primary/80",
        message:
          "rounded-full bg-green-500 text-primary-foreground hover:bg-primary/80",
        // Weitere Kategorien hier hinzufügen...
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  badgeClassName?: string; // Optional, um Klassen für das Badge zu definieren
}

function Badge({ className, variant, badgeClassName, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        className,
        badgeClassName // Hinzufügen der badgeClassName-Prop
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
