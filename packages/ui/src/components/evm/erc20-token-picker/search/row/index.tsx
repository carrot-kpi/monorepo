import React, { useCallback, MouseEvent } from "react";
import { mergedCva } from "../../../../../utils/components";
import { getDefaultERC20TokenLogoURL } from "../../../../../utils/erc20";
import {
    RemoteLogo,
    RemoteLogoProps,
    Typography,
    TypographyProps,
} from "../../../../data-display";
import { Skeleton } from "../../../../feedback";
import { TokenInfoWithBalance } from "../../types";
import { Balance } from "./balance";

const rootStyles = mergedCva(
    [
        "cui-flex",
        "cui-justify-between",
        "cui-items-center",
        "cui-h-16",
        "cui-px-3",
        "cui-cursor-pointer",
    ],
    {
        variants: {
            selected: {
                true: [
                    "cui-bg-gray-200",
                    "hover:cui-bg-gray-200",
                    "dark:cui-bg-gray-600",
                    "dark:hover:cui-bg-gray-600",
                ],
                false: ["hover:cui-bg-gray-100", "dark:hover:cui-bg-gray-700"],
            },
        },
    }
);

const wrapperStyles = mergedCva([
    "cui-flex",
    "cui-flex-col",
    "cui-gap-1",
    "cui-pointer-events-none",
    "cui-justify-center",
]);

export interface RowProps extends Partial<TokenInfoWithBalance> {
    index: number;
    style: object;
    selected?: boolean;
    loading?: boolean;
    loadingBalances?: boolean;
    onSelect?: (index: number) => void;
    ipfsGatewayURL?: string;
    className?: {
        root?: string;
        wrapper?: string;
        icon?: RemoteLogoProps["className"];
        textPrimary?: TypographyProps["className"];
        textSecondary?: TypographyProps["className"];
    };
}

export const Row = ({
    index,
    style,
    chainId,
    address,
    symbol,
    decimals,
    name,
    logoURI,
    balance,
    selected,
    loading,
    loadingBalances,
    onSelect,
    ipfsGatewayURL,
    className,
}: RowProps) => {
    const handleTokenClick = useCallback(
        (event: MouseEvent) => {
            if (!onSelect || !event.target || loading) return;
            const index = (event.target as HTMLLIElement).dataset.index;
            if (index !== undefined) {
                const parsedIndex = parseInt(index);
                if (parsedIndex >= 0) onSelect(parsedIndex);
            }
        },
        [onSelect, loading]
    );

    return (
        <li
            key={loading ? address : index}
            className={rootStyles({
                selected,
                className: className?.root,
            })}
            style={style}
            data-index={index}
            onClick={handleTokenClick}
        >
            <div className={wrapperStyles({ className: className?.wrapper })}>
                <div className="cui-flex cui-items-center cui-gap-2 cui-pointer-events-none">
                    {loading ? (
                        <Skeleton circular width="24px" />
                    ) : (
                        <RemoteLogo
                            src={logoURI}
                            size="sm"
                            defaultSrc={getDefaultERC20TokenLogoURL(
                                chainId,
                                address
                            )}
                            defaultText={symbol}
                            ipfsGatewayURL={ipfsGatewayURL}
                            className={{
                                ...className?.icon,
                                root: `cui-pointer-events-none ${className?.icon?.root}`,
                            }}
                        />
                    )}
                    {loading ? (
                        <Skeleton width="40px" />
                    ) : (
                        <Typography
                            className={{
                                ...className?.textPrimary,
                                root: `cui-pointer-events-none ${className?.textPrimary?.root}`,
                            }}
                        >
                            {symbol}
                        </Typography>
                    )}
                </div>
                {loading ? (
                    <Skeleton variant="xs" width="60px" />
                ) : (
                    <Typography
                        variant="xs"
                        className={{
                            ...className?.textSecondary,
                            root: `cui-text-gray-600 dark:cui-text-gray-200 cui-pointer-events-none ${className?.textSecondary?.root}`,
                        }}
                    >
                        {name}
                    </Typography>
                )}
            </div>
            <div className="cui-pointer-events-none cui-flex cui-gap-1">
                <Balance
                    loading={loading || loadingBalances}
                    decimals={decimals}
                    balance={balance}
                />
            </div>
        </li>
    );
};
