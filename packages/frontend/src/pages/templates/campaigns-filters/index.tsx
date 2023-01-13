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

const Slider = ({ value, total }: FilterDataProps) => (
    <section>
        <div className="flex justify-between">
            <TextMono size="sm">{value}</TextMono>
            <TextMono size="sm">{total}</TextMono>
        </div>
        <div className="w-full px-6">
            <div className="relative w-full h-1 bg-black">
                <span className="absolute top-0 z-10 w-4 h-4 -mt-1 -ml-2 bg-black rounded-full shadow cursor-pointer left-1/2"></span>
                <span className="absolute top-0 left-0 w-1/2 h-2 bg-teal-500 rounded-full"></span>
            </div>
        </div>
    </section>
);

interface FiltersDataProps {
    title: string;
    type: "options" | "slider";
    data: FilterDataProps[];
}

type FilterDataProps = {
    value: string;
    total: number;
};

const FiltersOptionsSection = ({ title, data, type }: FiltersDataProps) => (
    <div className="w-full">
        <TextMono size="lg" weight="medium" caps>
            {title}
        </TextMono>
        <div className="py-6 space-y-4 border-b">
            {data.map(({ value, total }) =>
                type === "slider" ? (
                    <Slider key={title} value={value} total={total} />
                ) : (
                    <CheckboxWithTotals
                        key={value}
                        title={value}
                        total={total}
                    />
                )
            )}
        </div>
    </div>
);

export const CampaignsFilters = () => {
    return (
        <div className="hidden p-12 bg-white border-r border-gray-400 md:block">
            <div className="w-64 space-y-6">
                {mockFiltersData.map((filter: any) => (
                    <FiltersOptionsSection
                        key={filter.title}
                        title={filter.title}
                        type={filter.type}
                        data={filter.data}
                    />
                ))}
            </div>
        </div>
    );
};

const mockFiltersData = [
    {
        title: "verification",
        type: "options",
        data: [
            {
                value: "All",
                total: 201,
            },
            {
                value: "verified",
                total: 176,
            },
            {
                value: "non verified",
                total: 28,
            },
        ],
    },
    {
        title: "token market",
        type: "options",
        data: [
            {
                value: "Uniswap",
                total: 120,
            },
            {
                value: "Swapr",
                total: 12,
            },
        ],
    },
    {
        title: "oracle",
        type: "options",
        data: [
            {
                value: "reality.eth",
                total: 120,
            },
            {
                value: "cosmos.eth",
                total: 12,
            },
            {
                value: "second.eth",
                total: 43,
            },
        ],
    },
    {
        title: "reward type",
        type: "options",
        data: [
            {
                value: "fixed",
                total: 73,
            },
            {
                value: "All or none",
                total: 34,
            },
            {
                value: "Guaranteed",
                total: 171,
            },
        ],
    },
    {
        title: "template used",
        type: "options",
        data: [
            {
                value: "generic",
                total: 112,
            },
            {
                value: "TVL",
                total: 58,
            },
            {
                value: "Token price",
                total: 61,
            },
            {
                value: "whitelist",
                total: 34,
            },
        ],
    },
    {
        title: "features",
        type: "slider",
        data: [
            {
                value: 0,
                total: 1,
            },
        ],
    },
    {
        title: "conditions",
        type: "slider",
        data: [
            {
                value: 0,
                total: 3,
            },
        ],
    },
];
