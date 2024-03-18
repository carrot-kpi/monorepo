import type { FunctionComponent } from "react";
import { sepolia, arbitrumSepolia } from "wagmi/chains";
import EthereumLogo from "./icons/chains/ethereum";
import ArbitrumLogo from "./icons/chains/arbitrum";
import Grid from "./icons/grid";
import { http, type Transport } from "viem";
import { SUPPORTED_CHAIN, type SupportedChain } from "@carrot-kpi/sdk";
import type { SVGIcon } from "./icons/types";
import { ChainId } from "@carrot-kpi/sdk";
import { Environment } from "@carrot-kpi/shared-state";

export const CARROT_KPI_FRONTEND_I18N_NAMESPACE = "@carrot-kpi/frontend";

export const DATA_MANAGER_JWT_ISSUER = "carrot-data-manager";

export const IPFS_GATEWAY_URL = "https://w3s.link";

export interface ChainIconData {
    logo: FunctionComponent<SVGIcon>;
    backgroundColor: string;
}

export interface CarrotChain extends SupportedChain {
    icon: ChainIconData;
}

export const SUPPORTED_CHAINS: [CarrotChain, ...CarrotChain[]] = [
    {
        ...SUPPORTED_CHAIN[ChainId.Sepolia],
        icon: {
            logo: EthereumLogo,
            backgroundColor: "#8637ea",
        },
    },
    {
        ...SUPPORTED_CHAIN[ChainId.ArbitrumSepolia],
        icon: {
            logo: ArbitrumLogo,
            backgroundColor: "#213147",
        },
    },
] as const;

export const SUPPORTED_CHAIN_TRANSPORT: Record<ChainId, Transport> = {
    [sepolia.id as number]: http(),
    [arbitrumSepolia.id as number]: http(),
};

export const CARROT_DOMAIN =
    __ENVIRONMENT__ === Environment.Production
        ? "carrot.community"
        : __ENVIRONMENT__ === Environment.Staging
          ? "staging.carrot.community"
          : "dev.carrot.community";

export interface NavbarLink {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: FunctionComponent<any>;
    to: string;
    external: boolean;
    highlighted?: boolean;
}

export const NAVBAR_LINKS: NavbarLink[] = [
    {
        title: "Campaigns",
        Icon: Grid,
        to: "/campaigns",
        external: false,
    },
    // TODO: enable once the designs for the create are ready
    // {
    //     title: "Create",
    //     Icon: Stars,
    //     to: "/create/1",
    //     external: false,
    //     highlighted: true,
    // },
];

export interface FooterLink {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: FunctionComponent<any>;
    title: string;
    links: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Component?: FunctionComponent<any>;
        title: string;
        to: string;
    }[];
}

export const DISCORD_LINK = "https://discord.gg/uRer2D4Pdf";
export const TWITTER_LINK = "https://twitter.com/CarrotEth";

export const FOOTER_LINKS: FooterLink[] = [
    {
        title: "About",
        links: [
            // TODO: add link to faq once we have them
            // {
            //     Component: Link,
            //     title: "Faq",
            //     to: "/faq",
            // },
            {
                title: "Documentation",
                to: `https://docs.${CARROT_DOMAIN}`,
            },
            {
                title: "Audits",
                to: "https://github.com/carrot-kpi/v1-contracts/tree/main/audits",
            },
            // TODO: add link to brand assets
            // {
            //     label: "Brand Assets",
            //     href: "#",
            // },
        ],
    },
    {
        title: "Community",
        links: [
            {
                title: "Discord",
                to: DISCORD_LINK,
            },
            {
                title: "Twitter",
                to: TWITTER_LINK,
            },
            // TODO: add link back once we have it
            // {
            //     label: "Brand Forum",
            //     href: "#",
            // },
        ],
    },
    // TODO: add back this section once analytics are developed
    // {
    //     title: "Analytics",
    //     links: [
    //         {
    //             title: "Dune",
    //             to: "https://dune.com/hagaetc/dxdao",
    //         },
    //     ],
    // },
];
