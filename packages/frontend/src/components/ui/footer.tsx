import React from "react";
import Logo from "../../icons/logo";
import { CARROT_DOMAIN, type FooterLink } from "../../constants";
import { Typography } from "@carrot-kpi/ui";

const FooterLinks = ({ title, links }: FooterLink) => (
    <ul className="w-40">
        <Typography
            data-testid={`${title}-text`}
            className={{ root: "text-white" }}
            uppercase
        >
            {title}
        </Typography>
        <div className="mt-6 space-y-3">
            {links.map(({ Component, to, title }) => {
                const content = (
                    <Typography
                        data-testid={`${title}-button`}
                        variant="sm"
                        className={{
                            root: "text-white cursor-pointer hover:underline",
                        }}
                    >
                        {title}
                    </Typography>
                );
                return !!Component ? (
                    <Component to={to} className="block" key={to}>
                        {content}
                    </Component>
                ) : (
                    <a
                        href={to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        key={to}
                    >
                        {content}
                    </a>
                );
            })}
        </div>
    </ul>
);

interface FooterProps {
    footerLinks: FooterLink[];
}

export const Footer = ({ footerLinks }: FooterProps) => (
    <div className="flex flex-col items-center w-full py-16 bg-black md:py-24 lg:py-32 px-6 md:px-24 xl:px-32">
        <div className="relative h-full mx-auto w-full md:w-[80%] bg-grid-dark bg-center">
            <div className="mx-auto py-14 md:py-24 xl:py-32 w-[80%]">
                <Logo className="relative w-full h-auto text-orange" />
            </div>
        </div>
        <div className="w-full max-w-screen-2xl flex flex-col justify-between pt-8 space-y-24 md:pt-24 lg:pt-32 xl:space-y-0 xl:flex-row xxl:px-52">
            <div className="grid grid-cols-2 gap-8 xs:gap-10 md:gap-0 md:flex xl:space-x-6">
                {footerLinks.map(({ title, links }) => (
                    <FooterLinks key={title} title={title} links={links} />
                ))}
            </div>
            <div className="flex items-end">
                <a
                    data-testid="footer-carrot-info-page-button"
                    href={`https://www.${CARROT_DOMAIN}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-5 font-mono text-black border border-black bg-orange rounded-xxl"
                >
                    Carrot info page
                </a>
            </div>
        </div>
    </div>
);
