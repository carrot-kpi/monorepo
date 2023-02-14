import React, { ReactElement } from "react";
import { ReactNode } from "react";

interface HorizontalSpacingProps {
    children: ReactNode;
}

export const HorizontalSpacing = ({
    children,
}: HorizontalSpacingProps): ReactElement => (
    <div className="px-6 md:px-10 lg:px-32">{children}</div>
);
