import { cva } from "class-variance-authority";
import React, { ReactElement, ReactNode } from "react";
import { Typography } from "../typography";

const rootStyles = cva([], {
    variants: {
        autoAlign: {
            true: ["cui-text-center", "sm:cui-text-left"],
        },
    },
});

const textStyles = cva([], {
    variants: {
        variant: {
            // FIXME: find a better way to override the styles?
            h3: ["!cui-text-h5 sm:!cui-text-h4 md:!cui-text-h3"],
            h2: ["!cui-text-h4 sm:!cui-text-h3 md:!cui-text-h2"],
            h1: ["!cui-text-h3 sm:!cui-text-h2 md:!cui-text-h1"],
        },
    },
});

type HeaderVariant = "h1" | "h2" | "h3";

export interface ResponsiveHeaderProps {
    children: ReactNode;
    variant?: HeaderVariant;
    autoAlign?: boolean;
    className?: { root?: string; text?: string };
}

export const ResponsiveHeader = ({
    children,
    variant,
    autoAlign,
    className,
}: ResponsiveHeaderProps): ReactElement => (
    <div
        className={rootStyles({
            autoAlign,
            className: className?.root,
        })}
    >
        <Typography
            variant={variant}
            className={{
                root: textStyles({ variant }),
            }}
        >
            {children}
        </Typography>
    </div>
);
