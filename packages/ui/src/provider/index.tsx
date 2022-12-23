import React, { ReactNode } from "react";

interface CarrotUIProviderProps {
    children: ReactNode;
}

export const CarrotUIProvider = ({ children }: CarrotUIProviderProps) => (
    <>{children}</>
);
