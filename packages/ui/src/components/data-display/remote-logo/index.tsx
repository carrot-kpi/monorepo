import React, { useState } from "react";
import { mergedCva } from "../../../utils/components";
import { resolveSrc } from "../../../utils/url";
import { Skeleton } from "../../feedback";

const BAD_SRC: Record<string, boolean> = {};

const rootStyles = mergedCva(["cui-relative"], {
    variants: {
        size: {
            sm: ["cui-w-6", "cui-h-6"],
            md: ["cui-w-7", "cui-h-7"],
            lg: ["cui-w-8", "cui-h-8"],
            xl: ["cui-w-9", "cui-h-9"],
            "2xl": ["cui-w-10", "cui-h-10"],
        },
    },
});

const imgStyles = mergedCva(["cui-rounded-full", "cui-absolute"], {
    variants: {
        size: {
            sm: ["cui-w-6", "cui-h-6"],
            md: ["cui-w-7", "cui-h-7"],
            lg: ["cui-w-8", "cui-h-8"],
            xl: ["cui-w-9", "cui-h-9"],
            "2xl": ["cui-w-10", "cui-h-10"],
        },
    },
});

const fallbackStyles = mergedCva(
    [
        "cui-bg-black",
        "cui-text-white",
        "dark:cui-bg-white",
        "dark:cui-text-black",
        "cui-rounded-full",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
    ],
    {
        variants: {
            size: {
                sm: ["cui-text-3xs", "cui-w-6", "cui-h-6"],
                md: ["cui-text-2xs", "cui-w-7", "cui-h-7"],
                lg: ["cui-text-xs", "cui-w-8", "cui-h-8"],
                xl: ["cui-text-sm", "cui-w-9", "cui-h-9"],
                "2xl": ["cui-text-base", "cui-w-10", "cui-h-10"],
            },
        },
    }
);

export interface RemoteLogoProps {
    src?: string | string[] | null;
    defaultSrc?: string | string[] | null;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    defaultText?: string | null;
    ipfsGatewayURL?: string | null;
    className?: { root: string };
}

export const RemoteLogo = ({
    src,
    defaultSrc,
    size = "md",
    defaultText = "?",
    ipfsGatewayURL,
    className,
}: RemoteLogoProps) => {
    const [, refresh] = useState(0);

    const resolvedSrcs = resolveSrc(src, ipfsGatewayURL, defaultSrc);

    const resolvedSrc = resolvedSrcs.find((s) => !BAD_SRC[s]);
    if (resolvedSrc) {
        return (
            <div className={rootStyles({ size, className: className?.root })}>
                <Skeleton
                    circular
                    width="100%"
                    className={{ root: "cui-absolute cui-inset-pixel" }}
                />
                <img
                    className={imgStyles({ size })}
                    src={resolvedSrc}
                    onError={() => {
                        BAD_SRC[resolvedSrc] = true;
                        refresh((prevState) => prevState + 1);
                    }}
                />
            </div>
        );
    }
    return (
        <div className={fallbackStyles({ size, className: className?.root })}>
            <div className="cui-font-mono cui-text-white dark:cui-text-black">
                {!!defaultText
                    ? defaultText.length > 4
                        ? `${defaultText.slice(0, 3).toUpperCase()}`
                        : defaultText.toUpperCase()
                    : "?"}
            </div>
        </div>
    );
};
