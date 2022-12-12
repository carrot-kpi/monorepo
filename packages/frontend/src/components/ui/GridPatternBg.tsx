import React from "react";

export const GridPatternBg = ({ className }: { className?: string }) => {
    return (
        <div
            className={`absolute h-[65%] md:h-[72.5%] w-[92.45%] top-0 md:top-8 left-[5%] ${className}`}
        >
            <div className="w-full h-full bg-square-pattern bg-[top_center] bg-2 md:bg-4"></div>
        </div>
    );
};
