import { ChainId } from "@carrot-kpi/sdk";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Avatar } from "./avatar";

export const ConnectWallet = () => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { address, connector: activeConnector } = useAccount();

    const [networksPopoverAnchor, setNetworksPopoverAnchor] =
        useState<HTMLDivElement | null>(null);
    const [connectWallet, setConnectWallet] =
        useState<HTMLButtonElement | null>(null);

    const networksPopoverRef = useRef<HTMLDivElement>(null);
    const connectPopoverRef = useRef<HTMLDivElement>(null);
    const accountPopoverRef = useRef<HTMLDivElement>(null);

    const [networksPopoverOpen, setNetworksPopoverOpen] = useState(false);
    const [connectPopoverOpen, setConnectPopoverOpen] = useState(false);
    const [accountPopoverOpen, setAccountPopoverOpen] = useState(false);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (
                networksPopoverRef.current &&
                !networksPopoverRef.current.contains(event.target as Node)
            )
                setNetworksPopoverOpen(false);
            if (
                connectPopoverRef.current &&
                !connectPopoverRef.current.contains(event.target as Node)
            )
                setConnectPopoverOpen(false);
            if (
                accountPopoverRef.current &&
                !accountPopoverRef.current.contains(event.target as Node)
            )
                setAccountPopoverOpen(false);
        };
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);
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
                    anchor={networksPopoverAnchor}
                    onNetworkSwitch={handleNetworkSwitchClick}
                    ref={networksPopoverRef}
                />
            )}
            <ConnectPopover
                open={connectPopoverOpen}
                anchor={connectWallet}
                onClose={handleConnectPopoverClose}
                ref={connectPopoverRef}
            />
            {address && (
                <AccountPopover
                    address={address as string}
                    open={accountPopoverOpen}
                    anchor={connectWallet}
                    onClose={handleAccountPopoverClose}
                    ref={accountPopoverRef}
                />
            )}
            <div className="flex gap-4">
                <div
                    className={`h-12 w-fit flex items-center ${
                        __PREVIEW_MODE__ ? "" : "cursor-pointer"
                    } gap-3`}
                    onClick={handleNetworksPopoverOpen}
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
                        ref={setConnectWallet}
                        onClick={handleAccountPopoverOpen}
                        className={{
                            root: "w-12 h-12 p-0",
                        }}
                    >
                        <Avatar address={address} />
                    </Button>
                ) : (
                    <Button
                        ref={setConnectWallet}
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
