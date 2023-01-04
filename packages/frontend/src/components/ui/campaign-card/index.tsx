import React from "react";
import { TextMono } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { CampaignCardRow } from "./campaign-card-row";
import { CampaignCardTag } from "./campaign-card-tag";
import { CampaignCardButton } from "./campaign-card-button";
import { correctColor } from "../../../utils/colors";

interface CampaignCardProps {
    title: string;
    question: string;
    rewards: string;
    timeLeft: string;
    color?: "white" | "black";
    sameBorder?: boolean;
    isHolding?: boolean;
}

export const CampaignCard = ({
    title,
    question,
    rewards,
    timeLeft,
    color,
    isHolding,
    sameBorder,
}: CampaignCardProps) => (
    <div
        className={campaignCardStyles({
            color,
            border: sameBorder ? "same" : color,
        })}
    >
        <div className="h-full">
            <div className="flex items-center w-full border-b border-gray-600">
                <div className="flex items-center h-12 border-r border-gray-600">
                    <div className="w-6 h-6 mx-3 rounded-full bg-blue"></div>
                </div>
                <div className="flex items-center justify-between w-full px-4">
                    <TextMono color={correctColor(color)} weight="medium" caps>
                        {title}
                    </TextMono>
                    {isHolding && (
                        <div className="flex items-center justify-center px-2 py-1 border rounded bg-green">
                            <TextMono
                                weight="medium"
                                size="xxs"
                                caps
                                color="black"
                            >
                                holding
                            </TextMono>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-between p-4 h-52">
                <TextMono color={correctColor(color)}>{question}</TextMono>
                <div className="flex items-center space-x-3">
                    <CampaignCardTag color={color}>
                        Template name
                    </CampaignCardTag>
                    <CampaignCardTag color={color}>
                        Gnosis Chain
                    </CampaignCardTag>
                </div>
            </div>
        </div>
        <div>
            <CampaignCardRow title="Rewards" value={rewards} color={color} />
            <CampaignCardRow title="Time left" value={timeLeft} color={color} />
            <CampaignCardButton color={color}>
                ↳ VIEW CAMPAIGN
            </CampaignCardButton>
        </div>
    </div>
);

const campaignCardStyles = cva(
    [
        " min-w-[340px] w-[340px] rounded-2xl flex flex-col justify-between border",
    ],
    {
        variants: {
            color: {
                black: ["bg-black"],
                white: ["bg-white"],
            },
            border: {
                black: ["border-white"],
                white: ["border-gray-600"],
                same: ["border-gray-600"],
            },
        },
        defaultVariants: {
            color: "black",
            border: "black",
        },
    }
);
