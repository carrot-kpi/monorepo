import { KPIToken, Template } from "@carrot-kpi/sdk";
import React from "react";
import { useNetwork } from "wagmi";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";

// this will be fetched in the future
const MOCKED_DATA = [
    {
        title: "DXdao",
        description:
            "<h2>Swapr average TVL</h2>What will the average TVL for Swapr on Gnosis Chain be from Jun 9th 15: 00 UTC to Jul 7th 15: 00 UTC? <code><pre>some code here</pre></code>",
    },
    {
        title: "COW PROTOCOL",
        description:
            "<h2>COW token average TVL</h2>What will the average TVL for the COW token on Swapr Gnosis Chain be from Sep 1st 15:00 UTC to Sep 29th 15:00 UTC?",
    },
    {
        title: "Hopr",
        description:
            "What will the average TVL for the Swapr Gnosis Chain HOPR-XDAI pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
    },
    {
        title: "DXdao",
        description:
            "<h2>Swapr average TVL</h2>What will the average TVL for Swapr on Gnosis Chain be from Jun 9th 15: 00 UTC to Jul 7th 15: 00 UTC? <code><pre>some code here</pre></code>",
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
    {
        title: "DXdao",
        description:
            "<h2>Swapr average TVL</h2>What will the average TVL for Swapr on Gnosis Chain be from Jun 9th 15: 00 UTC to Jul 7th 15: 00 UTC? <code><pre>some code here</pre></code>",
    },
    {
        title: "COW PROTOCOL",
        description:
            "What will the average TVL for the COW token on Swapr Gnosis Chain be from Sep 1st 15:00 UTC to Sep 29th 15:00 UTC?<ul><li>COW</li><li>TVL</li></ul>",
    },
    {
        title: "Hopr",
        description:
            "What will the <strong>average TVL</strong> for the Swapr <strong>Gnosis</strong> Chain <strong>HOPR-XDAI</strong> pair be from Apr 14th 15:00 UTC to May 12th 15:00 UTC?",
    },
];

export const CampaignsGrid = () => {
    const { chain } = useNetwork();

    return (
        <div className="flex flex-col items-center w-full mt-12 mb-32 sm:mx-3 md:mx-4 lg:mx-5 p-4">
            <div className="w-full gap-5 justify-items-center grid grid-cols-campaigns">
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
                        template,
                        [],
                        {
                            title,
                            description,
                            ipfsHash: "mocked-hash",
                            tags: ["mocked-tag"],
                        },
                        Date.now() + 1_000_000,
                        false
                    );
                    return <KPITokenCard key={index} kpiToken={kpiToken} />;
                })}
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
