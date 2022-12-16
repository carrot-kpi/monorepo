import React from "react";
import { Logo } from "@carrot-kpi/ui";
import { GridPatternBg } from "../grid-pattern-bg";
import { FooterColumn } from "./footer-column";
import { Link } from "react-router-dom";

const footerContent = [
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

export const Footer = () => (
    <div className="w-full py-16 bg-black md:py-24 lg:py-32">
        <div className="relative h-full mx-auto w-full md:w-[92%]">
            <GridPatternBg contrast fullSize />
            <div className="mx-auto py-14 md:py-24 xl:py-32 w-[90%]">
                <Logo color="#EF692B" className="relative w-auto h-auto" />
            </div>
        </div>
        <div className="flex flex-col justify-between px-6 pt-8 space-y-24 md:pt-24 lg:pt-32 md:px-24 xl:px-32 xl:space-y-0 xl:flex-row 2xl:px-52">
            <div className="grid grid-cols-2 gap-8 xs:gap-10 md:gap-0 md:flex xl:space-x-6">
                {footerContent.map(({ title, links }) => (
                    <FooterColumn key={title} title={title} links={links} />
                ))}
            </div>
            <div className="flex items-end">
                <a
                    href="https://carrot-web-zeta.vercel.app/"
                    className="px-6 py-5 font-mono text-black border border-black bg-carrot-orange rounded-2xl"
                >
                    Carrot info page
                </a>
            </div>
        </div>
    </div>
);
