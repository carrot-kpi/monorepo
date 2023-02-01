import { cva } from "class-variance-authority";
import React, { ReactElement, ReactNode } from "react";

const rootStyles = cva([
    "cui-border-b",
    "cui-border-black",
    "dark:cui-border-white",
    "[&:last-of-type]:cui-border-none",
]);

export interface CardContentProps {
    className?: { root?: string };
    children: ReactNode;
}

export const CardContent = ({
    className,
    children,
    ...rest
}: CardContentProps): ReactElement => (
    <div {...rest} className={rootStyles({ className: className?.root })}>
        {children}
    </div>
);
