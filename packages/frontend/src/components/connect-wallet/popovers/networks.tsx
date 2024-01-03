import React, { useCallback } from "react";
import { Popover, Typography } from "@carrot-kpi/ui";
import { forwardRef } from "react";
import { useNetwork } from "wagmi";
import { ChainIcon } from "../../chain-icon";
import { type AugmentedChain, SUPPORTED_CHAINS } from "../../../constants";
import { ChainId } from "@carrot-kpi/sdk";
import Error from "../../../icons/error";
import { useNavigate, useParams } from "react-router-dom";

interface NetworksPopoverProps {
    open: boolean;
    onNetworkSwitch: (chainId: number) => void;
    anchor?: HTMLElement | null;
}

export const NetworksPopover = forwardRef<HTMLDivElement, NetworksPopoverProps>(
    function NetworksPopover({ open, anchor, onNetworkSwitch }, ref) {
        const { address: kpiTokenAddress } = useParams();
        const navigate = useNavigate();
        const { chain, chains } = useNetwork();

        const handleChainClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                const id = (event.target as HTMLLIElement).dataset.chainId;
                if (!id) return;
                const intId = parseInt(id);
                if (isNaN(intId)) return;

                if (!!kpiTokenAddress) navigate("/");
                onNetworkSwitch(intId);
            },
            [onNetworkSwitch, kpiTokenAddress, navigate],
        );

        return (
            <Popover
                placement="bottom"
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
                            data-testid={`${supportedChain.name}-network-button`}
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
    },
);
