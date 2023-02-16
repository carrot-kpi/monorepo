import React, { useCallback } from "react";
import { Popover, Typography } from "@carrot-kpi/ui";
import { forwardRef } from "react";
import { SUPPORTED_CHAINS } from "../../../../constants";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { ChainIcon } from "../../../chain-icon";

interface NetworksPopoverProps {
    open: boolean;
    onClose: () => void;
    anchor?: HTMLElement | null;
}

export const NetworksPopover = forwardRef<HTMLDivElement, NetworksPopoverProps>(
    function NetworksPopover({ open, anchor, onClose }, ref) {
        const { chain } = useNetwork();
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
                {Object.values(SUPPORTED_CHAINS).map((supportedChain) => {
                    if (supportedChain.id === chain?.id) return null;
                    const Logo = supportedChain.logo;
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
                                        supportedChain.iconBackgroundColor
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
