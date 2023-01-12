import React, { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => (
    <div className={`px-6 lg:px-32 ${className ? className : ""}`}>
        {children}
    </div>
);
