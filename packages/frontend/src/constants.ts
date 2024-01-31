import type { FunctionComponent, SVGProps } from "react";
import {
    gnosis,
    sepolia,
    scrollSepolia,
    polygonMumbai,
    type Chain,
} from "wagmi/chains";
import EthereumLogo from "./icons/chains/ethereum";
import GnosisLogo from "./icons/chains/gnosis";
import ScrollLogo from "./icons/chains/scroll";
import PolygonLogo from "./icons/chains/polygon";
import { Service, getServiceURL } from "@carrot-kpi/sdk/utils/services";
import Grid from "./icons/grid";
import type { Transport } from "viem";
import { http } from "wagmi";

export const CARROT_KPI_FRONTEND_I18N_NAMESPACE = "@carrot-kpi/frontend";

export const DATA_MANAGER_JWT_ISSUER = "carrot-data-manager";

export const IPFS_GATEWAY_URL = "https://w3s.link";
export const DATA_MANAGER_URL = getServiceURL(
    Service.DATA_MANAGER,
    __BUILDING_MODE__ === "production",
);
export const STATIC_CDN_URL = getServiceURL(
    Service.STATIC_CDN,
    __BUILDING_MODE__ === "production",
);
export const DATA_CDN_URL = getServiceURL(
    Service.DATA_CDN,
    __BUILDING_MODE__ === "production",
);

export interface AugmentedChain extends Chain {
    logo: FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
    >;
    iconBackgroundColor: string;
    transport: Transport;
}

export const SUPPORTED_CHAINS =
    __BUILDING_MODE__ === "production"
        ? ([
              {
                  ...gnosis,
                  logo: GnosisLogo,
                  iconBackgroundColor: "#04795b",
                  transport: http(),
              },
          ] as const)
        : ([
              {
                  ...sepolia,
                  logo: EthereumLogo,
                  iconBackgroundColor: "#8637ea",
                  transport: http(),
              },
              {
                  ...scrollSepolia,
                  logo: ScrollLogo,
                  iconBackgroundColor: "#213147",
                  blockExplorers: {
                      default: {
                          name: "Scrollscan",
                          url: "https://sepolia.scrollscan.com",
                      },
                  },
                  transport: http(),
              },
              {
                  ...polygonMumbai,
                  logo: PolygonLogo,
                  iconBackgroundColor: "#8247E5",
                  transport: http(),
              },
          ] as const);

export const CARROT_DOMAIN =
    __BUILDING_MODE__ === "production"
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
