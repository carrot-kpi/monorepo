import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";
interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

const pageWrapperStyles = cva(["px-3", "lg:px-32"], {
    variants: {},
});

export const PageWrapper = ({ children, className }: PageWrapperProps) => (
    <div className={pageWrapperStyles({ className })}>{children}</div>
);
