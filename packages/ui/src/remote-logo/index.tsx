import { cva } from "class-variance-authority";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { resolveSrc } from "../utils/url";

const rootStyles = cva(
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
                md: ["cui-text-xxs", "cui-w-7", "cui-h-7"],
                lg: ["cui-text-xs", "cui-w-8", "cui-h-8"],
                xl: ["cui-text-sm", "cui-w-9", "cui-h-9"],
                xxl: ["cui-text-md", "cui-w-10", "cui-h-10"],
            },
        },
    }
);

export interface RemoteLogoProps {
    src?: string | string[] | null;
    defaultSrcs?: string | string[] | null;
    size?: "md" | "lg" | "xl" | "xxl";
    defaultText?: string | null;
    ipfsGatewayURL?: string | null;
    className?: { root: string };
}

export const RemoteLogo = ({
    src,
    defaultSrcs,
    size = "md",
    defaultText = "?",
    ipfsGatewayURL,
    className,
}: RemoteLogoProps) => {
    const [resolvedSrcs] = useState(
        resolveSrc(src, ipfsGatewayURL, defaultSrcs)
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
