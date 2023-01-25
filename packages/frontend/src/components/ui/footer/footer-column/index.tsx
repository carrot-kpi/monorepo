import React, { ElementType } from "react";
import { Text } from "@carrot-kpi/ui";
import { FooterLink } from "../footer-link";

export interface LinkProps {
    LinkComponent?: ElementType;
    title: string;
    url: string;
}

export interface FooterColumnProps {
    title: string;
    links: LinkProps[];
}

export const FooterColumn = ({ title, links }: FooterColumnProps) => (
    <ul className="w-40">
        <Text mono className={{ root: "text-white" }} uppercase>
            {title}
        </Text>
        <div className="mt-6 space-y-3">
            {links.map(({ LinkComponent, url, title }) => (
                <FooterLink key={url} url={url} LinkComponent={LinkComponent}>
                    <Text
                        mono
                        size="sm"
                        className={{
                            root: "text-white cursor-pointer hover:underline",
                        }}
                    >
                        {title}
                    </Text>
                </FooterLink>
            ))}
        </div>
    </ul>
);
