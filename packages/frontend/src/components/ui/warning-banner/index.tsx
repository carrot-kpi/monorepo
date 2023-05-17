import React, { ReactNode } from "react";

interface WarningBannerProps {
    children: ReactNode;
}

export const WarningBanner = ({ children }: WarningBannerProps) => {
    return <div className="bg-yellow px-10 py-6 text-center">{children}</div>;
};
