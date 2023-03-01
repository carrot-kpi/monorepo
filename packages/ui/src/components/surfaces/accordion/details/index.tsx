import React, { ReactElement, ReactNode } from "react";
import { mergedCva } from "../../../../utils/components";

const rootStyles = mergedCva(["cui-p-3"]);

interface DetailsProps {
    className?: { root?: string };
    children: ReactNode;
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
