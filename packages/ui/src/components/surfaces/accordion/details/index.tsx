import { cva } from "class-variance-authority";
import React, { ReactElement } from "react";

const rootStyles = cva(["cui-p-3"]);

interface DetailsProps {
    className?: { root?: string };
    children: ReactElement;
}

export const AccordionDetails = ({
    className,
    children,
    ...rest
}: DetailsProps): ReactElement => (
    <div {...rest} className={rootStyles({ className: className?.root })}>
        {children}
    </div>
);
