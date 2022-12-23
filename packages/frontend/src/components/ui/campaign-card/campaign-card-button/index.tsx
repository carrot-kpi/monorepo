import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface CampaignCardButtonProps {
    children: ReactNode;
    color?: "white" | "black";
}

export const CampaignCardButton = ({
    color,
    children,
}: CampaignCardButtonProps) => (
    <button className={campaignCardButtonStyles({ color })}>{children}</button>
);

const campaignCardButtonStyles = cva(
    ["w-full py-5 font-mono  border-t border-gray-600"],
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
