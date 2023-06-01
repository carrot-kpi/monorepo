import React from "react";
import { Typography } from "@carrot-kpi/ui";
import { FooterLink } from "../../../../constants";

export const FooterLinks = ({ title, links }: FooterLink) => (
    <ul className="w-40">
        <Typography className={{ root: "text-white" }} uppercase>
            {title}
        </Typography>
        <div className="mt-6 space-y-3">
            {links.map(({ Component, to, title }) => {
                const content = (
                    <Typography
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
