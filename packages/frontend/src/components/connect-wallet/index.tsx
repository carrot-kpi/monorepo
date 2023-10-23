import { ChainId } from "@carrot-kpi/sdk";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ENABLED_CHAINS, SUPPORTED_CHAINS } from "../../constants";
import Error from "../../icons/error";
import CaretDown from "../../icons/caret-down";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@carrot-kpi/ui";
import { useNetwork, useAccount } from "wagmi";
import { ChainIcon } from "../chain-icon";
import { NetworksPopover } from "./popovers/networks";
import { ConnectPopover } from "./popovers/connect";
import { AccountPopover } from "./popovers/account";
import { Avatar } from "./avatar";
import { cva } from "class-variance-authority";

const rootStyles = cva(["flex", "gap-4"]);

interface ConnectWalletProps {
    chainList?: boolean;
    className?: {
        root?: string;
        connectButton?: string;
    };
}

export const ConnectWallet = ({
    chainList = true,
    className,
}: ConnectWalletProps) => {
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
        <>
            {!__LIBRARY_MODE__ && (
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
                    address={address}
                    open={accountPopoverOpen}
                    anchor={connectWallet}
                    onClose={handleAccountPopoverClose}
                    ref={accountPopoverRef}
                />
            )}
            <div className={rootStyles({ className: className?.root })}>
                {chainList && (
                    <div
                        className={`h-12 w-fit flex items-center ${
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
                        <div className="flex flex-col">
                            <Typography variant="xs">
                                {t("connect.wallet.network")}
                            </Typography>
                            <Typography variant="sm">
                                {supportedChain ? chainName : "Unsupported"}
                            </Typography>
                        </div>
                        {!__LIBRARY_MODE__ && multipleEnabledChains && (
                            <CaretDown className="w-3" />
                        )}
                    </div>
                )}
                {address ? (
                    <Button
                        size="small"
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
                        size="small"
                        ref={setConnectWallet}
                        onClick={handleConnectPopoverOpen}
                        className={{
                            root: className?.connectButton,
                        }}
                    >
                        {t("connect.wallet")}
                    </Button>
                )}
            </div>
        </>
    );
};
