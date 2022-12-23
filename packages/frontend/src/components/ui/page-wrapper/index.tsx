import React, { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
    return <div className={`px-6 lg:px-32 ${className}`}>{children}</div>;
};
