import { cva } from "class-variance-authority";
import React, { ReactElement, ReactNode } from "react";

const rootStyles = cva([
    "cui-w-full",
    "cui-flex",
    "cui-items-center",
    "cui-justify-between",
    "cui-border-black",
    "dark:cui-border-white",
    "cui-p-3",
]);

interface CardTitleProps {
    className?: { root?: string };
    children: ReactNode;
}

export const CardTitle = ({
    className,
    children,
    ...rest
}: CardTitleProps): ReactElement => (
    <div {...rest} className={rootStyles({ className: className?.root })}>
        {children}
    </div>
);
