import React, { ElementType } from "react";
import { TextMono } from "@carrot-kpi/ui";
import { FooterLink } from "../footer-link";

interface LinkProps {
    LinkComponent?: ElementType;
    title: string;
    url: string;
}

interface FooterColumnProps {
    title: string;
    links: LinkProps[];
}

export const FooterColumn = ({ title, links }: FooterColumnProps) => (
    <ul className="w-40">
        <TextMono caps color="white">
            {title}
        </TextMono>
        <div className="mt-6 space-y-3">
            {links.map(({ LinkComponent, url, title }) => (
                <FooterLink key={url} url={url} LinkComponent={LinkComponent}>
                    <TextMono
                        color="white"
                        size="sm"
                        className="cursor-pointer hover:underline"
                    >
                        {title}
                    </TextMono>
                </FooterLink>
            ))}
        </div>
    </ul>
);
