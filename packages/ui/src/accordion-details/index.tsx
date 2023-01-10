import React, { ReactElement } from "react";

interface DetailsProps {
    className?: string;
    children: ReactElement;
}

export const AccordionDetails = ({
    className,
    children,
    ...rest
}: DetailsProps): ReactElement => (
    <div {...rest} className={`cui-p-3 ${className}`}>
        {children}
    </div>
);
