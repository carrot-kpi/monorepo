import { ChainId } from "@carrot-kpi/sdk";
import React, { useCallback, useRef, useState } from "react";
import { SUPPORTED_CHAINS } from "../../constants";
import { ReactComponent as Error } from "../../assets/error.svg";
import { ReactComponent as CaretDown } from "../../assets/caret-down.svg";
import { useTranslation } from "react-i18next";
import { Button, Popover, Typography } from "@carrot-kpi/ui";
import { useNetwork, useAccount, useSwitchNetwork } from "wagmi";
import { ChainIcon } from "../chain-icon";
import { NetworksPopover } from "./popovers/networks";
import { ConnectPopover } from "./popovers/connect";
import { AccountPopover } from "./popovers/account";
import { useClickAway } from "react-use";
import { Avatar } from "./avatar";
import { useSearchParams } from "react-router-dom";

interface ConnectWalletProps {
    mode: "standard" | "modal";
}

export const ConnectWallet = ({ mode }: ConnectWalletProps) => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { address } = useAccount();
    const { switchNetworkAsync } = useSwitchNetwork();
    const [searchParams, setSearchParams] = useSearchParams();

    const networksPopoverAnchorRef = useRef<HTMLDivElement>(null);
    const networksPopoverRef = useRef<HTMLDivElement>(null);
    const connectWalletRef = useRef<HTMLButtonElement>(null);
    const connectPopoverRef = useRef<HTMLDivElement>(null);
    const accountPopoverRef = useRef<HTMLDivElement>(null);

    const [networksPopoverOpen, setNetworksPopoverOpen] = useState(false);
    const [modalNetworksPopoverOpen, setModalNetworksPopoverOpen] =
        useState(false);
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

    const handleModalNetworksPopoverOpen = useCallback(() => {
        setModalNetworksPopoverOpen(true);
    }, []);

    const handleModalNetworksPopoverClose = useCallback(() => {
        setModalNetworksPopoverOpen(false);
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
            if (!switchNetworkAsync) return;
            try {
                const switchedChain = await switchNetworkAsync(chainId);
                searchParams.set("chain", switchedChain.name.toLowerCase());
                setSearchParams(searchParams);
            } catch (error) {
                console.warn("could not switch chain", error);
            }
            setNetworksPopoverOpen(false);
        },
        [searchParams, setSearchParams, switchNetworkAsync]
    );

    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    const chainName = chain?.name || t("connect.wallet.unknown");
    const supportedChain = !!chainId && !!SUPPORTED_CHAINS[chainId as ChainId];
    const Logo = supportedChain
        ? SUPPORTED_CHAINS[chainId as ChainId].logo
        : Error;
    return (
        <>
            {!__PREVIEW_MODE__ && mode !== "modal" && (
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
            <Popover
                placement="bottom"
                open={modalNetworksPopoverOpen}
                anchor={networksPopoverAnchorRef.current}
                className={{ root: "p-2 w-44" }}
            >
                <Typography>
                    {t("network.switch.disabled.modalMode")}
                </Typography>
            </Popover>
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
                        __PREVIEW_MODE__
                            ? ""
                            : mode === "modal"
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    } gap-3`}
                    onClick={handleNetworksPopoverOpen}
                    onMouseEnter={
                        mode === "modal"
                            ? handleModalNetworksPopoverOpen
                            : undefined
                    }
                    onMouseLeave={
                        mode === "modal"
                            ? handleModalNetworksPopoverClose
                            : undefined
                    }
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
                        <span className="font-mono text-black text-2xs">
                            {t("connect.wallet.network")}
                        </span>
                        <span className="font-mono text-sm text-black capitalize">
                            {supportedChain ? chainName : "Unsupported"}
                        </span>
                    </div>
                    {!__PREVIEW_MODE__ && mode !== "modal" && (
                        <CaretDown className="w-3" />
                    )}
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
