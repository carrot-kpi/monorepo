import { ChainId } from "@carrot-kpi/sdk";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SUPPORTED_CHAINS } from "../../constants";
import { ReactComponent as Error } from "../../assets/error.svg";
import { ReactComponent as CaretDown } from "../../assets/caret-down.svg";
import { ReactComponent as WrongNetwork } from "../../assets/wrong-network.svg";
import { useTranslation } from "react-i18next";
import { Button, Modal, Typography } from "@carrot-kpi/ui";
import { useNetwork, useAccount, useSwitchNetwork, Chain } from "wagmi";
import { ChainIcon } from "../chain-icon";
import { NetworksPopover } from "./popovers/networks";
import { ConnectPopover } from "./popovers/connect";
import { AccountPopover } from "./popovers/account";
import { useClickAway } from "react-use";
import { Avatar } from "./avatar";
import { useSearchParams } from "react-router-dom";
import { ReadonlyConnector } from "../../connectors/readonly";

// TODO: implement loading states
export const ConnectWallet = () => {
    const { t } = useTranslation();
    const { chain, chains } = useNetwork();
    const { address, connector: activeConnector } = useAccount();
    const {
        switchNetwork,
        isSuccess: switchedNetwork,
        pendingChainId,
        status: networkSwitchingStatus,
    } = useSwitchNetwork();
    const [searchParams, setSearchParams] = useSearchParams();
    const [chainFromSearchParams, setChainFromSearchParams] =
        useState<Chain | null>(null);

    const networksPopoverAnchorRef = useRef<HTMLDivElement>(null);
    const networksPopoverRef = useRef<HTMLDivElement>(null);
    const connectWalletRef = useRef<HTMLButtonElement>(null);
    const connectPopoverRef = useRef<HTMLDivElement>(null);
    const accountPopoverRef = useRef<HTMLDivElement>(null);

    const [networksPopoverOpen, setNetworksPopoverOpen] = useState(false);
    const [connectPopoverOpen, setConnectPopoverOpen] = useState(false);
    const [accountPopoverOpen, setAccountPopoverOpen] = useState(false);

    const [wrongChainModalOpen, setWrongChainModalOpen] = useState(false);
    const [canFreelySwitchNetworks, setCanFreelySwitchNetworks] =
        useState(false);

    // this effect saves to the internal state the target chain as taken from the
    // url search params.
    // it doesn't do that if the user can freely switch networks (i.e. if the user
    // has already landed on the page)
    useEffect(() => {
        if (canFreelySwitchNetworks) return;
        const targetChainName = searchParams.get("chain");
        if (!targetChainName) return;
        const targetChain = chains.find(
            (c) => c.name.toLowerCase() === targetChainName.toLowerCase()
        );
        if (!targetChain) return;
        setChainFromSearchParams(targetChain);
    }, [canFreelySwitchNetworks, chains, searchParams]);

    // this effect does a couple things:
    // - in case the dapp's url has no chain search param, it sets it to the currently connected chain
    // - if a target chain is specified, but we're in the middle of a network switching event, it does nothing
    // - if a target chain is specified, it is different to the currently active chain, and we're not in the
    // middle of a network switching event, it shows the wrong network modal, inviting the user to switch the
    // network in their wallet (it does so only the first time)
    useEffect(() => {
        if (!chain) return;
        const targetChainName = searchParams.get("chain");
        if (!targetChainName) {
            searchParams.set("chain", chain.name.toLowerCase());
            setSearchParams(searchParams);
            return;
        }

        // if the active connector is readonly, always switch to the target chain
        const readonlyConnectorActive =
            activeConnector instanceof ReadonlyConnector;
        if (readonlyConnectorActive) {
            const targetChainId = chains.find(
                (c) => c.name.toLowerCase() === targetChainName.toLowerCase()
            )?.id;
            if (targetChainId) activeConnector.switchChain(targetChainId);
        }

        if (networkSwitchingStatus !== "idle" || canFreelySwitchNetworks)
            return;
        const allowFreeNetworkSwitching =
            chain.name.toLowerCase() === targetChainName;
        setCanFreelySwitchNetworks(allowFreeNetworkSwitching);
        setWrongChainModalOpen(!!address && !allowFreeNetworkSwitching);
    }, [
        activeConnector,
        address,
        canFreelySwitchNetworks,
        chain,
        chains,
        networkSwitchingStatus,
        searchParams,
        setSearchParams,
    ]);

    // this updates the url when the network is switched
    useEffect(() => {
        if (!chain) return;
        const targetChainName = chains
            .find((c) => c.id === chain.id)
            ?.name.toLowerCase();
        if (!targetChainName) return;
        searchParams.set("chain", targetChainName);
        setSearchParams(searchParams);
    }, [
        chain,
        chains,
        pendingChainId,
        searchParams,
        setSearchParams,
        switchedNetwork,
    ]);

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
        (chainId: number) => {
            if (!switchNetwork) return;
            switchNetwork(chainId);
            setNetworksPopoverOpen(false);
        },
        [switchNetwork]
    );

    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    const chainName = chain?.name || t("connect.wallet.unknown");
    const supportedChain = !!chainId && !!SUPPORTED_CHAINS[chainId as ChainId];
    const Logo = supportedChain
        ? SUPPORTED_CHAINS[chainId as ChainId].logo
        : Error;
    return (
        <>
            <Modal open={wrongChainModalOpen}>
                <div className="bg-white border border-black rounded-xl p-8 flex flex-col items-center gap-4 z-[1] max-w-md">
                    <WrongNetwork className="w-40" />
                    <Typography variant="h5">
                        {t("wrong.network.title")}
                    </Typography>
                    <Typography className={{ root: "text-center" }}>
                        {t("wrong.network.description", {
                            chainName: chainFromSearchParams?.name,
                        })}
                    </Typography>
                </div>
            </Modal>
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
                        <span className="font-mono text-black text-2xs">
                            {t("connect.wallet.network")}
                        </span>
                        <span className="font-mono text-sm text-black capitalize">
                            {supportedChain ? chainName : "Unsupported"}
                        </span>
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
