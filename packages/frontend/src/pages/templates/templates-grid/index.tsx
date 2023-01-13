import React from "react";
import { CampaignCard } from "../../../components/ui/campaign-card";

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

export const TemplatesGrid = () => {
    return (
        <div className="max-w-6xl px-3 py-12 pb-32">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
                {campaignsMockData.map((campaign) => (
                    <CampaignCard
                        key={campaign.id}
                        title={campaign.title}
                        question={campaign.question}
                        expiration={parseInt(campaign.timeLeft)}
                        templateName="Template name"
                        tags={["Tag"]}
                        isHolding={campaign.holder}
                        dark
                        noBorder
                    />
                ))}
            </div>
            <div className="flex justify-center w-full pt-8 xl:justify-start">
                <Pagination />
            </div>
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
