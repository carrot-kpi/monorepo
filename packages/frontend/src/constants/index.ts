import { ChainId } from "@carrot-kpi/sdk";
import { FunctionComponent, SVGProps } from "react";
import { goerli, sepolia } from "wagmi/chains";
import { Chain } from "wagmi/chains";
import { ReactComponent as EthereumLogo } from "../assets/chains/ethereum.svg";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export const CARROT_KPI_FRONTEND_I18N_NAMESPACE = "@carrot-kpi/frontend";

interface AugmentedChain extends Chain {
    logo: FunctionComponent<SVGProps<SVGSVGElement>>;
    iconBackgroundColor: string;
}

export const SUPPORTED_CHAINS: Record<ChainId, AugmentedChain> = {
    [ChainId.SEPOLIA]: {
        ...sepolia,
        logo: EthereumLogo,
        iconBackgroundColor: "#8637ea",
    },
    [ChainId.GOERLI]: {
        ...goerli,
        logo: EthereumLogo,
        iconBackgroundColor: "#3099f2",
    },
};

export interface NavbarLink {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: FunctionComponent<any>;
    title: string;
    to: string;
}

export const NAVBAR_LINKS: NavbarLink[] = [
    {
        Component: NavLink,
        title: "About",
        to: "/about",
    },
    {
        Component: NavLink,
        title: "Campaigns",
        to: "/campaigns",
    },
    {
        title: "Community",
        to: "/community",
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
            {
                Component: Link,
                title: "Faq",
                to: "/faq",
            },
            {
                title: "Twitter",
                to: "/twitter",
            },
            {
                title: "Keybase",
                to: "/keybase",
            },
            {
                title: "Forum",
                to: "/forum",
            },
        ],
    },
    {
        title: "Community",
        links: [
            {
                title: "Discord",
                to: "/Discord",
            },
            {
                title: "Blog",
                to: "/Blog",
            },
            {
                title: "Jobs",
                to: "/jobs",
            },
            {
                title: "Brand Assets",
                to: "/brand-assets",
            },
        ],
    },
    {
        title: "Documentation",
        links: [
            {
                title: "DIY Liq. Mining",
                to: "/diy-liq-mining",
            },
            {
                title: "Roadmap",
                to: "/Roadmap",
            },
            {
                title: "Audits",
                to: "/audits",
            },
            {
                title: "Token",
                to: "/token",
            },
        ],
    },
    {
        title: "Analytics",
        links: [
            {
                title: "Dune",
                to: "https://dune.com/hagaetc/dxdao",
            },
        ],
    },
];
