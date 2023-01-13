import { TextMono } from "@carrot-kpi/ui";
import React from "react";
import { CheckOption } from "../check-option";
import { Slider } from "../slider";

export interface FiltersDataProps {
    title: string;
    type: "options" | "slider";
    data: FilterDataProps[];
}

export type FilterDataProps = {
    value: string;
    total: number;
};

export const FilterOptions = ({ title, data, type }: FiltersDataProps) => (
    <div className="w-full">
        <TextMono size="lg" weight="medium" caps>
            {title}
        </TextMono>
        <div className="py-6 space-y-4 border-b">
            {data.map(({ value, total }) =>
                type === "slider" ? (
                    <Slider key={title} value={value} total={total} />
                ) : (
                    <CheckOption key={value} title={value} total={total} />
                )
            )}
        </div>
    </div>
);
