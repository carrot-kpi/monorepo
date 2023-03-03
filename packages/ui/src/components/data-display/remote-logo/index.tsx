import React, { useCallback, useEffect, useState } from "react";
import { mergedCva } from "../../../utils/components";
import { resolveSrc } from "../../../utils/url";

const rootStyles = mergedCva(
    [
        "cui-bg-black",
        "dark:cui-bg-white",
        "cui-rounded-full",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
    ],
    {
        variants: {
            size: {
                sm: ["cui-text-2xs", "cui-w-6", "cui-h-6"],
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
    const [resolvedSrcs] = useState(
        resolveSrc(src, ipfsGatewayURL, defaultSrc)
    );
    const [resolvedDefaultText, setResolvedDefaultText] = useState("");
    const [srcIndex, setSrcIndex] = useState(0);

    useEffect(() => {
        setResolvedDefaultText(
            !!defaultText
                ? defaultText.length > 4
                    ? `${defaultText.slice(0, 3).toUpperCase()}`
                    : defaultText.toUpperCase()
                : "?"
        );
    }, [defaultText]);

    const handleError = useCallback(() => {
        setSrcIndex(srcIndex + 1);
    }, [srcIndex]);

    if (!!resolvedSrcs[srcIndex]) {
        return (
            <img
                className={rootStyles({ size, className: className?.root })}
                src={resolvedSrcs[srcIndex]}
                onError={handleError}
            />
        );
    }
    return (
        <div className={rootStyles({ size, className: className?.root })}>
            <div className="cui-font-mono cui-text-white dark:cui-text-black">
                {resolvedDefaultText}
            </div>
        </div>
    );
};
