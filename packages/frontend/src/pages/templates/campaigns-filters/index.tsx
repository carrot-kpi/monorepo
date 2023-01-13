import React from "react";
import { FilterOptions } from "./filter-options";

export const CampaignsFilters = () => {
    return (
        <div className="hidden p-12 bg-white border-r border-gray-400 md:block">
            <div className="w-64 space-y-6">
                {mockFiltersData.map((filter: any) => (
                    <FilterOptions
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
