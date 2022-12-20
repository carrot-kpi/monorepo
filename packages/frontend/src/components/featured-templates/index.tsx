import React from "react";
import { CardHorizontal } from "../ui/cards-horizontal";
import { TemplateCard } from "../ui/template-card";

// this will be fetched in the future
const featuredTemplatesMockData = [
    {
        id: 1,
        type: "GENERIC ERC20 TEMPLATE",
        description:
            "Maecenas vitae mattis tellus. Nullam auctor quis imperdiet augue.",
        oracle: "Reality.eth",
        version: "1",
        creator: "0x24...7ae5",
        address: "0x01...K0E8",
        used: 420,
    },
    {
        id: 3,
        type: "GENERIC ERC20 TEMPLATE",
        description:
            "Maecenas vitae mattis tellus. Nullam auctor quis imperdiet augue.",
        oracle: "Reality.eth",
        version: "1",
        creator: "0x33...7ae5",
        address: "0x19...C9W1",
        used: 172,
    },
    {
        id: 2,
        type: "GENERIC ERC20 TEMPLATE",
        description:
            "Maecenas vitae mattis tellus. Nullam auctor quis imperdiet augue.",
        oracle: "Cosmos.eth",
        version: "1",
        creator: "0x73...2bA4",
        address: "0x19...C9W1",
        used: 321,
    },
    {
        id: 23,
        type: "GENERIC ERC20 TEMPLATE",
        description:
            "Maecenas vitae mattis tellus. Nullam auctor quis imperdiet augue.",
        oracle: "Reality.eth",
        version: "1",
        creator: "0x13...2bA4",
        address: "0x82...D1W1",
        used: 21,
    },
];

export const FeaturedTemplates = () => (
    <CardHorizontal>
        {featuredTemplatesMockData.map((template) => (
            <TemplateCard
                key={template.id}
                type={template.type}
                description={template.description}
                oracle={template.oracle}
                version={template.version}
                creator={template.creator}
                address={template.address}
                used={template.used}
                color="white"
            />
        ))}
    </CardHorizontal>
);
