import { cva } from "class-variance-authority";
import React, { ReactElement } from "react";

interface DetailsProps {
    className?: string;
    children: ReactElement;
}

const detailsStyles = cva(["cui-p-3"], { variants: {} });

export const Details = ({
    className,
    children,
    ...rest
}: DetailsProps): ReactElement => (
    <div {...rest} className={detailsStyles({ className })}>
        {children}
    </div>
);
