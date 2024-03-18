import React, { useCallback, useRef, useState } from "react";
import { ChainIcon } from "../chain-icon";
import CaretDown from "../../icons/caret-down";
import { useAccount, useConfig } from "wagmi";
import Error from "../../icons/error";
import { NetworksPopover } from "./networks-popover";
import { Typography } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";
import { useClickAway } from "react-use";
import { Environment } from "@carrot-kpi/shared-state";

export interface ChainSelectProps {
    compact?: boolean;
}

export const ChainSelect = ({ compact = true }: ChainSelectProps) => {
    const { t } = useTranslation();
    const { chains } = useConfig();
    const { connector: activeConnector, chain } = useAccount();

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
                await activeConnector?.switchChain?.({ chainId });
            } catch (error) {
                console.warn("could not switch network", error);
            }
            setNetworksPopoverOpen(false);
        },
        [activeConnector],
    );

    const Logo = chain?.icon.logo || Error;

    return (
        <div>
            {__ENVIRONMENT__ !== Environment.Local && (
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
                    __ENVIRONMENT__ === Environment.Local || chains.length === 1
                        ? ""
                        : "cursor-pointer"
                } gap-3`}
                onClick={
                    chains.length > 1 ? handleNetworksPopoverOpen : undefined
                }
                ref={setNetworksPopoverAnchor}
            >
                <ChainIcon
                    data-testid={`${chain?.id}-icon`}
                    backgroundColor={chain?.icon.backgroundColor || "#ff0000"}
                    logo={<Logo width={18} height={18} />}
                />
                {!compact && (
                    <Typography
                        data-testid={`${chain?.id}-button`}
                        variant="sm"
                    >
                        {chain?.name || t("connect.wallet.unknown")}
                    </Typography>
                )}
                {__ENVIRONMENT__ !== Environment.Local && chains.length > 1 && (
                    <CaretDown className="w-3 dark:text-white" />
                )}
            </div>
        </div>
    );
};
