import { ChainId } from "@carrot-kpi/sdk";
import type { FunctionComponent, SVGProps } from "react";
import { gnosis, sepolia, scrollSepolia, polygonMumbai } from "wagmi/chains";
import type { Chain } from "wagmi/chains";
import EthereumLogo from "./icons/chains/ethereum";
import GnosisLogo from "./icons/chains/gnosis";
import ScrollLogo from "./icons/chains/scroll";
import PolygonLogo from "./icons/chains/polygon";
import { Service, getServiceURL } from "@carrot-kpi/sdk/utils/services";
import Grid from "./icons/grid";

type RPCConfig = {
    http: string;
    webSocket?: string | undefined;
} | null;

export const RPC_BY_CHAIN: Record<ChainId, RPCConfig> = {
    [ChainId.SEPOLIA]: null, // covered by the infura connector
    [ChainId.GNOSIS]: {
        http: "https://rpc.ankr.com/gnosis",
        webSocket: "wss://rpc.gnosischain.com/wss",
    },
    [ChainId.SCROLL_SEPOLIA]: {
        http: "https://sepolia-rpc.scroll.io",
        webSocket: "wss://sepolia-rpc.scroll.io",
    },
    [ChainId.POLYGON_MUMBAI]: {
        http: "https://polygon-mumbai-pokt.nodies.app/",
        webSocket: "wss://rpc-mumbai.matic.today",
    },
};

export const CARROT_KPI_FRONTEND_I18N_NAMESPACE = "@carrot-kpi/frontend";

export const DATA_UPLOADER_JWT_ISSUER = "carrot-data-uploader";

const prod = __PROD__ && !__LIBRARY_MODE__ && !__STAGING_MODE__;

export const IPFS_GATEWAY_URL = getServiceURL(Service.IPFS_GATEWAY, prod);
export const DATA_UPLOADER_URL = getServiceURL(Service.DATA_UPLOADER, prod);
export const STATIC_CDN_URL = getServiceURL(Service.STATIC_CDN, prod);

export interface AugmentedChain extends Chain {
    logo: FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
    >;
    iconBackgroundColor: string;
    enabled: boolean;
    defaultBlockExplorer: string;
}

export const SUPPORTED_CHAINS: Record<ChainId, AugmentedChain> = {
    [ChainId.GNOSIS]: {
        ...gnosis,
        logo: GnosisLogo,
        iconBackgroundColor: "#04795b",
        enabled: prod,
        defaultBlockExplorer: "https://gnosisscan.io",
    },
    [ChainId.SEPOLIA]: {
        ...sepolia,
        logo: EthereumLogo,
        iconBackgroundColor: "#8637ea",
        enabled: !prod,
        defaultBlockExplorer: "https://sepolia.etherscan.io",
    },
    [ChainId.SCROLL_SEPOLIA]: {
        ...scrollSepolia,
        logo: ScrollLogo,
        iconBackgroundColor: "#213147",
        enabled: !prod,
        defaultBlockExplorer: "https://blockscout.scroll.io",
    },
    [ChainId.POLYGON_MUMBAI]: {
        ...polygonMumbai,
        logo: PolygonLogo,
        iconBackgroundColor: "#8247E5",
        enabled: !prod,
        defaultBlockExplorer: "https://mumbai.polygonscan.com/",
    },
};

export const ENABLED_CHAINS: { [chainId: number]: AugmentedChain } =
    Object.entries(SUPPORTED_CHAINS).reduce(
        (
            accumulator: { [chainId: number]: AugmentedChain },
            [chainId, augmentedChain],
        ) => {
            if (augmentedChain.enabled)
                accumulator[parseInt(chainId)] = augmentedChain;
            return accumulator;
        },
        {},
    );

export const DEFAULT_CHAIN: Chain = Object.values(ENABLED_CHAINS).filter(
    (chain) => chain.enabled,
)[0];

export const CARROT_DOMAIN = prod
    ? "carrot.community"
    : "staging.carrot.community";

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
