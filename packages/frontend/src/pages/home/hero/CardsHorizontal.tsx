import React, { ReactNode } from "react";

export const CardHorizontal = ({ children }: { children: ReactNode }) => (
    <div className="flex justify-between pl-6 -mx-6 space-x-5 overflow-x-auto md:pl-0 xl:mx-0 xl:overflow-hidden xl:mr-0 xl:space-x-20 2xl:space-x-32">
        {children}
    </div>
);
