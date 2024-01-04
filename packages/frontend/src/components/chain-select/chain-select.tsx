import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChainIcon } from "../chain-icon";
import { ENABLED_CHAINS, SUPPORTED_CHAINS } from "src/constants";
import type { ChainId } from "@carrot-kpi/sdk";
import CaretDown from "src/icons/caret-down";
import { useAccount, useNetwork } from "wagmi";
import Error from "src/icons/error";
import { NetworksPopover } from "./networks-popover";
import { Typography } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";

export interface ChainSelectProps {
    compact?: boolean;
}

export const ChainSelect = ({ compact = true }: ChainSelectProps) => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { address, connector: activeConnector } = useAccount();

    const [networksPopoverAnchor, setNetworksPopoverAnchor] =
        useState<HTMLDivElement | null>(null);
    const [networksPopoverOpen, setNetworksPopoverOpen] = useState(false);

    const networksPopoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (
                networksPopoverRef.current &&
                !networksPopoverRef.current.contains(event.target as Node)
            )
                setNetworksPopoverOpen(false);
        };
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    const handleNetworksPopoverOpen = useCallback(() => {
        setNetworksPopoverOpen(true);
    }, []);

    const handleNetworkSwitchClick = useCallback(
        async (chainId: number) => {
            try {
                await activeConnector?.switchChain?.(chainId);
            } catch (error) {
                console.warn("could not switch network", error);
            }
            setNetworksPopoverOpen(false);
        },
        [activeConnector],
    );

    const multipleEnabledChains = Object.keys(ENABLED_CHAINS).length > 1;
    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    const chainName = chain?.name || t("connect.wallet.unknown");
    const supportedChain = !!chainId && !!ENABLED_CHAINS[chainId];
    const Logo = supportedChain
        ? ENABLED_CHAINS[chainId as ChainId].logo
        : Error;

    return (
        <div>
            {!__LIBRARY_MODE__ && (
                <NetworksPopover
                    open={networksPopoverOpen}
                    anchor={networksPopoverAnchor}
                    onNetworkSwitch={handleNetworkSwitchClick}
                    ref={networksPopoverRef}
                />
            )}
            {address && (
                <div
                    className={`h-11 w-fit flex items-center border border-black dark:border-white px-[10px] rounded-lg ${
                        __LIBRARY_MODE__ || !multipleEnabledChains
                            ? ""
                            : "cursor-pointer"
                    } gap-3`}
                    onClick={
                        multipleEnabledChains
                            ? handleNetworksPopoverOpen
                            : undefined
                    }
                    ref={setNetworksPopoverAnchor}
                >
                    <ChainIcon
                        backgroundColor={
                            supportedChain
                                ? SUPPORTED_CHAINS[chainId as ChainId]
                                      .iconBackgroundColor
                                : "#ff0000"
                        }
                        logo={<Logo width={18} height={18} />}
                    />
                    {!compact && (
                        <Typography
                            data-testid={`${chainName}-button`}
                            variant="sm"
                        >
                            {supportedChain ? chainName : "Unsupported"}
                        </Typography>
                    )}
                    {!__LIBRARY_MODE__ && multipleEnabledChains && (
                        <CaretDown className="w-3" />
                    )}
                </div>
            )}
        </div>
    );
};
