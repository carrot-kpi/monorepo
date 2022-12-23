import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface CampaignCardTagProps {
    children: ReactNode;
    color?: "white" | "black";
}

export const CampaignCardTag = ({ children, color }: CampaignCardTagProps) => (
    <button className={campaignCardTagStyles({ color })}>{children}</button>
);

const campaignCardTagStyles = cva(
    ["block p-1 font-mono text-xs border rounded-lg"],
    {
        variants: {
            color: {
                black: ["text-white border-white"],
                white: ["text-black"],
            },
        },
        defaultVariants: {
            color: "black",
        },
    }
);
