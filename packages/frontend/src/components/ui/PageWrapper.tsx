import React, { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
    return <div className="px-6 lg:px-32">{children}</div>;
};
