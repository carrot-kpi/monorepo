import React from "react";
import { Typography } from "@carrot-kpi/ui";
import { FilterDataProps } from "../filter-options";

export const Slider = ({ value, total }: FilterDataProps) => (
    <section>
        <div className="flex justify-between">
            <Typography variant="sm">{value}</Typography>
            <Typography variant="sm">{total}</Typography>
        </div>
        <div className="w-full px-6">
            <div className="relative w-full h-1 bg-black">
                <span className="absolute top-0 z-10 w-4 h-4 -mt-1 -ml-2 bg-black rounded-full shadow cursor-pointer left-1/2"></span>
                <span className="absolute top-0 left-0 w-1/2 h-2 bg-teal-500 rounded-full"></span>
            </div>
        </div>
    </section>
);
