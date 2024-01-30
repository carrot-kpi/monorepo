import React, { useCallback, useRef, useState } from "react";
import { ChainIcon } from "../chain-icon";
import { ENABLED_CHAINS, SUPPORTED_CHAINS } from "../../constants";
import type { ChainId } from "@carrot-kpi/sdk";
import CaretDown from "../../icons/caret-down";
import { useAccount, useNetwork } from "wagmi";
import Error from "../../icons/error";
import { NetworksPopover } from "./networks-popover";
import { Typography } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";
import { useClickAway } from "react-use";

export interface ChainSelectProps {
    compact?: boolean;
}

export const ChainSelect = ({ compact = true }: ChainSelectProps) => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { connector: activeConnector } = useAccount();

    const [networksPopoverAnchor, setNetworksPopoverAnchor] =
        useState<HTMLDivElement | null>(null);
    const [networksPopoverOpen, setNetworksPopoverOpen] = useState(false);

    const networksPopoverRef = useRef<HTMLDivElement>(null);

    useClickAway(networksPopoverRef, () => {
        setNetworksPopoverOpen(false);
    });

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
            {__BUILDING_MODE__ !== "library" && (
                <NetworksPopover
                    open={networksPopoverOpen}
                    anchor={networksPopoverAnchor}
                    onNetworkSwitch={handleNetworkSwitchClick}
                    ref={networksPopoverRef}
                />
            )}
            <div
                data-testid="network-drop-down-button"
                className={`h-11 w-fit flex items-center border border-black dark:border-white px-[10px] rounded-lg ${
                    __BUILDING_MODE__ === "library" || !multipleEnabledChains
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
                    data-testid={`${chainId}-icon`}
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
                {__BUILDING_MODE__ !== "library" && multipleEnabledChains && (
                    <CaretDown className="w-3 dark:text-white" />
                )}
            </div>
        </div>
    );
};
