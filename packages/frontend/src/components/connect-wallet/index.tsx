import { ChainId } from "@carrot-kpi/sdk";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SUPPORTED_CHAINS } from "../../constants";
import { ReactComponent as Error } from "../../assets/error.svg";
import { ReactComponent as CaretDown } from "../../assets/caret-down.svg";
import { useTranslation } from "react-i18next";
import { Button } from "@carrot-kpi/ui";
import { useNetwork, useAccount, useEnsAvatar, useEnsName } from "wagmi";
import makeBlockie from "ethereum-blockies-base64";
import { constants } from "ethers";
import { ChainIcon } from "../chain-icon";
import { NetworksPopover } from "./popovers/networks";
import { ConnectPopover } from "./popovers/connect";
import { AccountPopover } from "./popovers/account";
import { shortenAddress } from "../../utils/address";

// TODO: implement loading states
export const ConnectWallet = () => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { address } = useAccount();
    const { data: ensName } = useEnsName({
        address,
    });
    const { data: ensAvatar } = useEnsAvatar({
        address,
    });
    const networksPopoverAnchorRef = useRef<HTMLDivElement>(null);
    const networksPopoverRef = useRef<HTMLDivElement>(null);
    const connectWalletRef = useRef<HTMLButtonElement>(null);
    const connectPopoverRef = useRef<HTMLDivElement>(null);
    const accountPopoverRef = useRef<HTMLDivElement>(null);

    const [networksPopoverOpen, setNetworksPopoverOpen] = useState(false);
    const [connectPopoverOpen, setConnectPopoverOpen] = useState(false);
    const [accountPopoverOpen, setAccountPopoverOpen] = useState(false);

    const handleNetworksPopoverOpen = useCallback(() => {
        setNetworksPopoverOpen(true);
    }, []);

    const handleNetworksPopoverClose = useCallback(() => {
        setNetworksPopoverOpen(false);
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

    useEffect(() => {
        const handleCloseOnClick = (event: MouseEvent) => {
            if (
                !!networksPopoverRef.current &&
                !networksPopoverRef.current.contains(event.target as Node)
            )
                setNetworksPopoverOpen(false);
            if (
                !!connectPopoverRef.current &&
                !connectPopoverRef.current.contains(event.target as Node)
            )
                setConnectPopoverOpen(false);
            if (
                !!accountPopoverRef.current &&
                !accountPopoverRef.current.contains(event.target as Node)
            )
                setAccountPopoverOpen(false);
        };
        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [networksPopoverOpen]);

    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    // TODO: i18n
    const chainName = chain?.name || "Unknown";
    const supportedChain = !!chainId && !!SUPPORTED_CHAINS[chainId as ChainId];
    const Logo = supportedChain
        ? SUPPORTED_CHAINS[chainId as ChainId].logo
        : Error;
    return (
        <>
            {!__PREVIEW_MODE__ && (
                <>
                    <NetworksPopover
                        open={networksPopoverOpen}
                        anchor={networksPopoverAnchorRef.current}
                        onClose={handleNetworksPopoverClose}
                        ref={networksPopoverRef}
                    />
                    <ConnectPopover
                        open={connectPopoverOpen}
                        anchor={connectWalletRef.current}
                        onClose={handleConnectPopoverClose}
                        ref={connectPopoverRef}
                    />
                    <AccountPopover
                        open={accountPopoverOpen}
                        anchor={connectWalletRef.current}
                        onClose={handleAccountPopoverClose}
                        ref={accountPopoverRef}
                    />
                </>
            )}
            <div className="flex items-center gap-4">
                <div
                    className={`h-12 flex items-center ${
                        __PREVIEW_MODE__ ? "" : "cursor-pointer"
                    } gap-3 mr-3`}
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
                {!!address && address !== constants.AddressZero ? (
                    <Button
                        ref={connectWalletRef}
                        onClick={handleAccountPopoverOpen}
                        className={{
                            root: "h-12 px-3",
                        }}
                    >
                        <div className="flex items-center text-base">
                            <img
                                className="w-7 h-7 mr-3 rounded-full"
                                src={ensAvatar || makeBlockie(address)}
                            />
                            {ensName || shortenAddress(address)}
                        </div>
                    </Button>
                ) : (
                    <Button
                        ref={connectWalletRef}
                        onClick={handleConnectPopoverOpen}
                    >
                        {t("connect.wallet")}
                    </Button>
                )}
            </div>
        </>
    );
};
