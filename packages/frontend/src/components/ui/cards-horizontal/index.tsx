import React, { ReactNode } from "react";

export const CardHorizontal = ({ children }: { children: ReactNode }) => (
    <div className="flex gap-2 overflow-x-auto sm:gap-5 snap-mandatory snap-x">
        {children}
    </div>
);
