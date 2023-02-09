import { cva } from "class-variance-authority";
import React, { ReactElement, ReactNode } from "react";

const rootStyles = cva(["cui-flex", "cui-gap-4", "cui-p-4"]);

export interface CardActionsProps {
    className?: { root?: string };
    children: ReactNode;
}

export const CardActions = ({
    className,
    children,
    ...rest
}: CardActionsProps): ReactElement => (
    <div {...rest} className={rootStyles({ className: className?.root })}>
        {children}
    </div>
);
