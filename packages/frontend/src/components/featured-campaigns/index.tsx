import React from "react";
import { CampaignCard } from "../ui/campaign-card";

// this will be fetched in the future
const featuredCampaignsMockData = [
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
        id: 2,
        title: "COW PROTOCOL",
        question:
            "What will the average TVL for the COW token on Swapr Gnosis Chain be from Sep 1st 15:00 UTC to Sep 29th 15:00 UTC?",
        rewards: "$69,420.00",
        timeLeft: "12D 08H 32M",
    },
    {
        id: 3,
        title: "Hopr",
        question:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
        rewards: "$14,227.00",
        timeLeft: "99D 08H 32M",
    },
];

export const FeaturedCampaings = () => (
    <>
        {featuredCampaignsMockData.map((campaign) => (
            <CampaignCard
                key={campaign.id}
                title={campaign.title}
                question={campaign.question}
                rewards={campaign.rewards}
                timeLeft={campaign.timeLeft}
                isHolding={campaign.holder}
                sameBorder
            />
        ))}
    </>
);
