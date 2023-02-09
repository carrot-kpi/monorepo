import React from "react";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { GridPatternBg } from "../grid-pattern-bg";
import { FooterLink } from "../../../constants";
import { FooterLinks } from "./footer-column";

interface FooterProps {
    footerLinks: FooterLink[];
}

export const Footer = ({ footerLinks }: FooterProps) => (
    <div className="w-full py-16 bg-black md:py-24 lg:py-32">
        <div className="relative h-full mx-auto w-full md:w-[92%]">
            <GridPatternBg bg="black" fullSize />
            <div className="mx-auto py-14 md:py-24 xl:py-32 w-[90%]">
                <Logo className="relative w-auto h-auto text-orange" />
            </div>
        </div>
        <div className="flex flex-col justify-between px-6 pt-8 space-y-24 md:pt-24 lg:pt-32 md:px-24 xl:px-32 xl:space-y-0 xl:flex-row xxl:px-52">
            <div className="grid grid-cols-2 gap-8 xs:gap-10 md:gap-0 md:flex xl:space-x-6">
                {footerLinks.map(({ title, links }) => (
                    <FooterLinks key={title} title={title} links={links} />
                ))}
            </div>
            <div className="flex items-end">
                <a
                    href="https://carrot-web-zeta.vercel.app/"
                    className="px-6 py-5 font-mono text-black border border-black bg-orange rounded-xxl"
                >
                    Carrot info page
                </a>
            </div>
        </div>
    </div>
);
