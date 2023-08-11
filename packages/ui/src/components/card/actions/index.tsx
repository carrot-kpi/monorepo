import React, { type ReactElement, type ReactNode } from "react";
import { mergedCva } from "../../../utils/components";

const rootStyles = mergedCva(["cui-flex", "cui-gap-4", "cui-p-4"]);

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
