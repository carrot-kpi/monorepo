import React from "react";
import { CampaignCard } from "../../../components/ui/campaign-card";

export const CampaignsGrid = () => {
    return (
        <div className="flex flex-col items-center w-full mt-12 mb-32 sm:mx-3 md:mx-4 lg:mx-5">
            <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
                {campaignsMockData.map((campaign) => (
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
            </div>
            <Pagination />
        </div>
    );
};

const PaginationNumber = ({ number }: { number: string | number }) => (
    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full cursor-pointer hover:bg-green">
        {number}
    </div>
);

const Pagination = () => (
    <div className="flex mt-6 space-x-4">
        <PaginationNumber number={1} />
        <PaginationNumber number={2} />
        <PaginationNumber number={"..."} />
        <PaginationNumber number={12} />
    </div>
);

// this will be fetched in the future
const campaignsMockData = [
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
    {
        id: 6,
        title: "Hopr",
        question:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
        rewards: "$14,227.00",
        timeLeft: "99D 08H 32M",
    },
    {
        id: 4,
        title: "DXdao",
        question:
            "What will the average TVL for Swapr on Gnosis Chain be from Jun 9th 15: 00 UTC to Jul 7th 15: 00 UTC?",
        rewards: "$8,667.00",
        timeLeft: "2D 13H 44M",
        holder: true,
    },
    {
        id: 5,
        title: "COW PROTOCOL",
        question:
            "What will the average TVL for the COW token on Swapr Gnosis Chain be from Sep 1st 15:00 UTC to Sep 29th 15:00 UTC?",
        rewards: "$69,420.00",
        timeLeft: "12D 08H 32M",
    },
    {
        id: 7,
        title: "COW PROTOCOL",
        question:
            "What will the average TVL for the COW token on Swapr Gnosis Chain be from Sep 1st 15:00 UTC to Sep 29th 15:00 UTC?",
        rewards: "$69,420.00",
        timeLeft: "12D 08H 32M",
    },
    {
        id: 8,
        title: "Hopr",
        question:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
        rewards: "$14,227.00",
        timeLeft: "99D 08H 32M",
    },
    {
        id: 86,
        title: "Hopr",
        question:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
        rewards: "$14,227.00",
        timeLeft: "99D 08H 32M",
    },
];
