import React, { useCallback } from "react";
import { Popover, Typography } from "@carrot-kpi/ui";
import { forwardRef } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { ChainIcon } from "../../../chain-icon";
import { AugmentedChain, SUPPORTED_CHAINS } from "../../../../constants";
import { ChainId } from "@carrot-kpi/sdk";
import { ReactComponent as Error } from "../../../../assets/error.svg";

interface NetworksPopoverProps {
    open: boolean;
    onClose: () => void;
    anchor?: HTMLElement | null;
}

export const NetworksPopover = forwardRef<HTMLDivElement, NetworksPopoverProps>(
    function NetworksPopover({ open, anchor, onClose }, ref) {
        const { chain, chains } = useNetwork();
        const { switchNetwork } = useSwitchNetwork();

        const handleChainClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                if (!switchNetwork) return;
                const id = (event.target as HTMLLIElement).dataset.chainId;
                if (!id) return;
                const intId = parseInt(id);
                if (isNaN(intId)) return;
                switchNetwork(intId);
                onClose();
            },
            [onClose, switchNetwork]
        );

        return (
            <Popover
                open={open}
                anchor={anchor}
                ref={ref}
                className={{ root: "p-4 flex flex-col gap-4" }}
            >
                {Object.values(chains).map((supportedChain) => {
                    if (supportedChain.id === chain?.id) return null;
                    const chainFromSupportedChains = SUPPORTED_CHAINS[
                        supportedChain.id as ChainId
                    ] as AugmentedChain | undefined;
                    const Logo = chainFromSupportedChains?.logo || Error;
                    return (
                        <div
                            key={supportedChain.id}
                            className="cursor-pointer"
                            onClick={handleChainClick}
                            data-chain-id={supportedChain.id}
                        >
                            <div className="flex items-center gap-4 pointer-events-none">
                                <ChainIcon
                                    backgroundColor={
                                        chainFromSupportedChains?.iconBackgroundColor ||
                                        "#ff0000"
                                    }
                                    logo={<Logo width={18} height={18} />}
                                />
                                <Typography>{supportedChain.name}</Typography>
                            </div>
                        </div>
                    );
                })}
            </Popover>
        );
    }
);
