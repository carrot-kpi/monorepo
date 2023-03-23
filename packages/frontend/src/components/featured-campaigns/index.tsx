import { KPIToken } from "@carrot-kpi/sdk/lib/entities/kpi-token";
import { Template } from "@carrot-kpi/sdk/lib/entities/template";
import React from "react";
import { useNetwork } from "wagmi";
import { KPITokenCard } from "../ui/kpi-token-card";

// this will be fetched in the future
const MOCKED_DATA = [
    {
        title: "DXdao",
        description:
            "What will the average TVL for Swapr on Gnosis Chain be from Jun 9th 15: 00 UTC to Jul 7th 15: 00 UTC?",
    },
    {
        title: "COW PROTOCOL",
        description:
            "What will the average TVL for the COW token on Swapr Gnosis Chain be from Sep 1st 15:00 UTC to Sep 29th 15:00 UTC?",
    },
    {
        title: "Hopr",
        description:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
    },
];

export const FeaturedCampaigns = () => {
    const { chain } = useNetwork();

    return (
        <>
            {MOCKED_DATA.map(({ title, description }, index) => {
                if (!chain) return <KPITokenCard key={index} noBorder />;
                const template = new Template(
                    1,
                    "0x0000000000000000000000000000000000000000",
                    1,
                    {
                        cid: "mocked-cid",
                        commitHash: "mocked-commit-hash",
                        description: "mocked-description",
                        name: "mocked-name",
                        repository: "mocked-repository",
                        tags: ["mocked-tag"],
                    }
                );
                const kpiToken = new KPIToken(
                    chain.id,
                    "0x0000000000000000000000000000000000000000",
                    "0x0000000000000000000000000000000000000000",
                    template,
                    [],
                    {
                        title,
                        description,
                        ipfsHash: "mocked-hash",
                        tags: ["mocked-tag"],
                    },
                    Date.now() + 1_000_000,
                    Date.now(),
                    false
                );
                return (
                    <div className="dark" key={index}>
                        <KPITokenCard kpiToken={kpiToken} noBorder />
                    </div>
                );
            })}
        </>
    );
};
