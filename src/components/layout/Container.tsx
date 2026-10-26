import type { HTMLAttributes, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "default" | "narrow" | "wide";
  children: ReactNode;
}

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-site",
  wide: "max-w-[1600px]",
};

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-gutter", sizes[size], className)} {...rest}>
      {children}
    </Tag>
  );
}
