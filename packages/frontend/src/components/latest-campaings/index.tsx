import { TextMono } from "@carrot-kpi/ui";
import React from "react";
import { CardHorizontal } from "../ui/cards-horizontal";
import { CampaignCard } from "../ui/campaign-card";

// this will be fetched in the future
const latestCampaignsMockData = [
    {
        id: 2,
        title: "COW PROTOCOL",
        question:
            "What will the average TVL for the COW token on Swapr Gnosis Chain be from Sep 1st 15:00 UTC to Sep 29th 15:00 UTC?",
        rewards: "$69,420.00",
        timeLeft: "12D 08H 32M",
    },
    {
        id: 1,
        title: "DXdao",
        question:
            "What will the average TVL for Swapr on Gnosis Chain be from Jun 9th 15: 00 UTC to Jul 7th 15: 00 UTC?",
        rewards: "$8,667.00",
        timeLeft: "2D 13H 44M",
        holder: true,
    },
    {
        id: 3,
        title: "Hopr",
        question:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
        rewards: "$14,227.00",
        timeLeft: "99D 08H 32M",
    },

    {
        id: 4,
        title: "Klover",
        question:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
        rewards: "$14,227.00",
        timeLeft: "99D 08H 32M",
    },
    {
        id: 5,
        title: "Aave",
        question:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
        rewards: "$14,227.00",
        timeLeft: "99D 08H 32M",
    },
];

export const LatestCampaigns = ({ category }: { category: string }) => (
    <div className="space-y-6">
        <TextMono caps mediumWeight>
            {category}
        </TextMono>
        <CardHorizontal>
            {latestCampaignsMockData.map((campaign) => (
                <CampaignCard
                    key={campaign.id}
                    title={campaign.title}
                    question={campaign.question}
                    expiration={parseInt(campaign.timeLeft)}
                    templateName="Template name"
                    tags={["Tag"]}
                    isHolding={campaign.holder}
                />
            ))}
        </CardHorizontal>
    </div>
);
