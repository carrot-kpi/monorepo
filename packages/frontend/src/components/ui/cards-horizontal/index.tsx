import React, { ReactNode } from "react";

export const CardHorizontal = ({ children }: { children: ReactNode }) => (
    <div className="flex gap-10 overflow-x-auto snap-mandatory snap-x">
        {children}
    </div>
);
