import { ChainId } from "@carrot-kpi/sdk";
import { FunctionComponent, SVGProps } from "react";
import { gnosis, sepolia, scrollTestnet } from "wagmi/chains";
import { Chain } from "wagmi/chains";
import EthereumLogo from "../icons/chains/ethereum";
import GnosisLogo from "../icons/chains/gnosis";
import ScrollLogo from "../icons/chains/scroll";
import { NavLink } from "react-router-dom";

export const CARROT_KPI_FRONTEND_I18N_NAMESPACE = "@carrot-kpi/frontend";

export interface AugmentedChain extends Chain {
    logo: FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
    >;
    iconBackgroundColor: string;
    enabled: boolean;
}

export const SUPPORTED_CHAINS: Record<ChainId, AugmentedChain> = {
    [ChainId.GNOSIS]: {
        ...gnosis,
        logo: GnosisLogo,
        iconBackgroundColor: "#04795b",
        enabled: true,
        // FIXME: redisable gnosis in staging mode once tests have been done
        // enabled: !__STAGING_MODE__,
    },
    [ChainId.SEPOLIA]: {
        ...sepolia,
        logo: EthereumLogo,
        iconBackgroundColor: "#8637ea",
        enabled: true,
    },
    [ChainId.SCROLL_TESTNET]: {
        ...scrollTestnet,
        logo: ScrollLogo,
        iconBackgroundColor: "#213147",
        enabled: true,
    },
};

export const ENABLED_CHAINS: { [chainId: number]: AugmentedChain } =
    Object.entries(SUPPORTED_CHAINS).reduce(
        (
            accumulator: { [chainId: number]: AugmentedChain },
            [chainId, augmentedChain]
        ) => {
            if (augmentedChain.enabled)
                accumulator[parseInt(chainId)] = augmentedChain;
            return accumulator;
        },
        {}
    );

export const DEFAULT_CHAIN: Chain = Object.values(ENABLED_CHAINS).filter(
    (chain) => chain.enabled
)[0];

export const CARROT_DOMAIN = __DEV__ ? "carrot-kpi.dev" : "carrot-kpi.io";

export interface NavbarLink {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: FunctionComponent<any>;
    title: string;
    to: string;
    external: boolean;
}

export const NAVBAR_LINKS: NavbarLink[] = [
    {
        Component: NavLink,
        title: "About",
        to: `https://www.${CARROT_DOMAIN}`,
        external: true,
    },
    {
        Component: NavLink,
        title: "Campaigns",
        to: "/campaigns",
        external: false,
    },
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
                to: "https://discord.gg/vssJce4H",
            },
            {
                title: "Twitter",
                to: "https://twitter.com/CarrotEth",
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
