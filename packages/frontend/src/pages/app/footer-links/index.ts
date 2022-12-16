import { Link } from "react-router-dom";

export const footerLinks = [
    {
        title: "About",
        links: [
            {
                LinkComponent: Link,
                title: "Faq",
                url: "/faq",
            },
            {
                title: "Twitter",
                url: "/twitter",
            },
            {
                title: "Keybase",
                url: "/keybase",
            },
            {
                title: "Forum",
                url: "/forum",
            },
        ],
    },
    {
        title: "Community",
        links: [
            {
                title: "Discord",
                url: "/Discord",
            },
            {
                title: "Blog",
                url: "/Blog",
            },
            {
                title: "Jobs",
                url: "/jobs",
            },
            {
                title: "Brand Assets",
                url: "/brand-assets",
            },
        ],
    },
    {
        title: "Documentation",
        links: [
            {
                title: "DIY Liq. Mining",
                url: "/diy-liq-mining",
            },
            {
                title: "Roadmap",
                url: "/Roadmap",
            },
            {
                title: "Audits",
                url: "/audits",
            },
            {
                title: "Token",
                url: "/token",
            },
        ],
    },
    {
        title: "Analytics",
        links: [
            {
                title: "Dune",
                url: "https://dune.com/hagaetc/dxdao",
            },
        ],
    },
];
