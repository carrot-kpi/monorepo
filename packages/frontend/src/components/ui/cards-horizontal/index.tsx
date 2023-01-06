import React, { ReactNode } from "react";

export const CardHorizontal = ({ children }: { children: ReactNode }) => (
    <div className="flex px-6 -mx-6 space-x-5 overflow-x-auto md:space-x-8 lg:px-32 lg:-mx-32 lg:space-x-10 xl:px-32 xl:-mx-32 xl:space-x-20 xxl:space-x-32">
        {children}
    </div>
);
