import React, { ReactNode, ElementType } from "react";

export interface FooterLinkProps {
    LinkComponent?: ElementType;
    url: string;
    children: ReactNode;
}

export const FooterLink = ({
    LinkComponent,
    url,
    children,
}: FooterLinkProps) => {
    if (LinkComponent)
        return (
            <LinkComponent to={url} className="block" key={url}>
                {children}
            </LinkComponent>
        );

    return (
        <a href={url} className="block" key={url}>
            {children}
        </a>
    );
};
