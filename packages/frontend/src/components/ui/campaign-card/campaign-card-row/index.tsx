import React from "react";
import { TextMono } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { correctColor } from "../../../../utils/colors";

interface CampaignCardRowProps {
    color?: "white" | "black";
    title: string;
    value: string;
}

export const CampaignCardRow = ({
    title,
    value,
    color,
}: CampaignCardRowProps) => (
    <div className={campaigncardRowStyles({ color })}>
        <TextMono
            color={correctColor(color)}
            size="sm"
            className="p-4 w-[40%]"
            caps
        >
            {title}
        </TextMono>
        <TextMono
            color={correctColor(color)}
            size="sm"
            className="text-right w-[60%] p-4 border-l border-gray-600"
            caps
        >
            {value}
        </TextMono>
    </div>
);

const campaigncardRowStyles = cva(
    ["flex items-center justify-between w-full  border-t border-gray-600"],
    {
        variants: {
            color: {
                black: ["text-white"],
                white: ["text-black"],
            },
        },
        defaultVariants: {
            color: "black",
        },
    }
);
