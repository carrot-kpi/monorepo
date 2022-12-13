import React, { ReactNode } from "react";

interface MainTitleProps {
    children: ReactNode;
}

export const MainTitle = ({ children }: MainTitleProps) => {
    return <h1 className="text-5xl font-bold md:text-6xl">{children}</h1>;
};
