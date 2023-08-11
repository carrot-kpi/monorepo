import React, { type ReactElement, type ReactNode } from "react";
import { mergedCva } from "../../../utils/components";

const rootStyles = mergedCva([
    "cui-w-full",
    "cui-flex",
    "cui-items-center",
    "cui-justify-between",
    "cui-p-3",
    "cui-h-12",
    "cui-flex",
    "cui-items-center",
    "cui-border-b",
    "cui-border-black",
    "dark:cui-border-white",
    "[&:last-of-type]:cui-border-none",
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
