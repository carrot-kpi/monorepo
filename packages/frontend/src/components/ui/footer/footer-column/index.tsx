import React, { ElementType } from "react";
import { Typography } from "@carrot-kpi/ui";
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
        <Typography className={{ root: "text-white" }} uppercase>
            {title}
        </Typography>
        <div className="mt-6 space-y-3">
            {links.map(({ LinkComponent, url, title }) => (
                <FooterLink key={url} url={url} LinkComponent={LinkComponent}>
                    <Typography
                        variant="sm"
                        className={{
                            root: "text-white cursor-pointer hover:underline",
                        }}
                    >
                        {title}
                    </Typography>
                </FooterLink>
            ))}
        </div>
    </ul>
);
