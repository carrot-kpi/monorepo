import { TextMono } from "@carrot-kpi/ui";
import React from "react";

const CheckboxInput = ({ title }: { title: string }) => (
    <div className="flex items-center space-x-2">
        <input type="checkbox" name={title} id={title} className="w-5 h-5" />
        <TextMono>{title}</TextMono>
    </div>
);

const CheckboxWithTotals = ({
    title,
    total,
}: {
    title: string;
    total: number;
}) => (
    <label className="flex items-center justify-between cursor-pointer">
        <CheckboxInput title={title} />
        <TextMono size="sm">{total}</TextMono>
    </label>
);

const FiltersOptionsSection = ({ title }: { title: string }) => (
    <div className="w-full">
        <TextMono size="lg" weight="medium" caps>
            {title}
        </TextMono>
        <div className="py-6 space-y-4 border-b">
            <CheckboxWithTotals title="All" total={201} />
            <CheckboxWithTotals title="verified" total={176} />
            <CheckboxWithTotals title="Non verified" total={34} />
        </div>
    </div>
);

export const CampaignsFilters = () => {
    return (
        <div className="hidden p-12 bg-white border-r border-gray-400 md:block">
            <div className="w-64 space-y-6">
                <FiltersOptionsSection title="Verification" />
                <FiltersOptionsSection title="Token market" />
                <FiltersOptionsSection title="Oracle" />
                <FiltersOptionsSection title="reward type" />
                <FiltersOptionsSection title="template used" />
            </div>
        </div>
    );
};
