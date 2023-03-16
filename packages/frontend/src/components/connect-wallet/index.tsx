import { ChainId } from "@carrot-kpi/sdk";
import React, { useCallback, useRef, useState } from "react";
import { SUPPORTED_CHAINS } from "../../constants";
import { ReactComponent as Error } from "../../assets/error.svg";
import { ReactComponent as CaretDown } from "../../assets/caret-down.svg";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@carrot-kpi/ui";
import { useNetwork, useAccount } from "wagmi";
import { ChainIcon } from "../chain-icon";
import { NetworksPopover } from "./popovers/networks";
import { ConnectPopover } from "./popovers/connect";
import { AccountPopover } from "./popovers/account";
import { useClickAway } from "react-use";
import { Avatar } from "./avatar";

export const ConnectWallet = () => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { address, connector: activeConnector } = useAccount();

    const networksPopoverAnchorRef = useRef<HTMLDivElement>(null);
    const networksPopoverRef = useRef<HTMLDivElement>(null);
    const connectWalletRef = useRef<HTMLButtonElement>(null);
    const connectPopoverRef = useRef<HTMLDivElement>(null);
    const accountPopoverRef = useRef<HTMLDivElement>(null);

    const [networksPopoverOpen, setNetworksPopoverOpen] = useState(false);
    const [connectPopoverOpen, setConnectPopoverOpen] = useState(false);
    const [accountPopoverOpen, setAccountPopoverOpen] = useState(false);

    useClickAway(networksPopoverRef, () => {
        setNetworksPopoverOpen(false);
    });

    useClickAway(connectPopoverRef, () => {
        setConnectPopoverOpen(false);
    });

    useClickAway(accountPopoverRef, () => {
        setAccountPopoverOpen(false);
    });

    const handleNetworksPopoverOpen = useCallback(() => {
        setNetworksPopoverOpen(true);
    }, []);

    const handleConnectPopoverOpen = useCallback(() => {
        setConnectPopoverOpen(true);
    }, []);

    const handleConnectPopoverClose = useCallback(() => {
        setConnectPopoverOpen(false);
    }, []);

    const handleAccountPopoverOpen = useCallback(() => {
        setAccountPopoverOpen(true);
    }, []);

    const handleAccountPopoverClose = useCallback(() => {
        setAccountPopoverOpen(false);
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
        [activeConnector]
    );

    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    const chainName = chain?.name || t("connect.wallet.unknown");
    const supportedChain = !!chainId && !!SUPPORTED_CHAINS[chainId as ChainId];
    const Logo = supportedChain
        ? SUPPORTED_CHAINS[chainId as ChainId].logo
        : Error;
    return (
        <>
            {!__PREVIEW_MODE__ && (
                <NetworksPopover
                    open={networksPopoverOpen}
                    anchor={networksPopoverAnchorRef.current}
                    onNetworkSwitch={handleNetworkSwitchClick}
                    ref={networksPopoverRef}
                />
            )}
            <ConnectPopover
                open={connectPopoverOpen}
                anchor={connectWalletRef.current}
                onClose={handleConnectPopoverClose}
                ref={connectPopoverRef}
            />
            {address && (
                <AccountPopover
                    address={address as string}
                    open={accountPopoverOpen}
                    anchor={connectWalletRef.current}
                    onClose={handleAccountPopoverClose}
                    ref={accountPopoverRef}
                />
            )}
            <div className="flex flex-col gap-4 xl:flex-row">
                <div
                    className={`h-12 w-fit flex items-center ${
                        __PREVIEW_MODE__ ? "" : "cursor-pointer"
                    } gap-3`}
                    onClick={handleNetworksPopoverOpen}
                    ref={networksPopoverAnchorRef}
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
                    <div className="flex flex-col">
                        <Typography variant="2xs">
                            {t("connect.wallet.network")}
                        </Typography>
                        <Typography variant="sm">
                            {supportedChain ? chainName : "Unsupported"}
                        </Typography>
                    </div>
                    {!__PREVIEW_MODE__ && <CaretDown className="w-3" />}
                </div>
                {address ? (
                    <Button
                        ref={connectWalletRef}
                        onClick={handleAccountPopoverOpen}
                        className={{
                            root: "w-12 h-12 p-0",
                        }}
                    >
                        <Avatar address={address} />
                    </Button>
                ) : (
                    <Button
                        ref={connectWalletRef}
                        onClick={handleConnectPopoverOpen}
                        className={{
                            root: "h-12 px-3 w-full xl:w-fit",
                        }}
                    >
                        {t("connect.wallet")}
                    </Button>
                )}
            </div>
        </>
    );
};
