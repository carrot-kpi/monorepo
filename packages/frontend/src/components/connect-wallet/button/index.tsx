import { ChainId } from "@carrot-kpi/sdk";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SUPPORTED_CHAINS } from "../../../constants";
import { ReactComponent as Error } from "../../../assets/error.svg";
import { ReactComponent as CaretDown } from "../../../assets/caret-down.svg";
import { useTranslation } from "react-i18next";
import { Button, Popover, Typography } from "@carrot-kpi/ui";
import { useNetwork, useAccount, useSwitchNetwork } from "wagmi";
import makeBlockie from "ethereum-blockies-base64";
import { shortenAddress } from "../../../utils/address";
import { ChainIcon } from "../../chain-icon";

const POPOVER_OFFSET: [number, number] = [0, 20];

interface ConnectWalletButtonProps {
    openConnectModal?: () => void;
    openAccountModal?: () => void;
}

// TODO: implement loading states
export const ConnectWalletButton = ({
    openConnectModal,
    openAccountModal,
}: ConnectWalletButtonProps) => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { address } = useAccount();
    const { switchNetwork } = useSwitchNetwork();
    // const { data: ensName } = useEnsName({
    //     address,
    // });
    // const { data: ensAvatar } = useEnsAvatar({
    //     address,
    // });
    const anchorRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const [networksPopupOpen, setNetworksPopupOpen] = useState(false);

    const handleOpenNetworksPopover = useCallback(() => {
        setNetworksPopupOpen(true);
    }, []);

    useEffect(() => {
        if (!networksPopupOpen) return;
        const handleCloseOnClick = (event: MouseEvent) => {
            if (
                !!popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            )
                setNetworksPopupOpen(false);
        };
        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [networksPopupOpen]);

    const handleChainClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (!switchNetwork) return;
            const id = (event.target as HTMLLIElement).dataset.chainId;
            if (!id) return;
            const intId = parseInt(id);
            if (isNaN(intId)) return;
            switchNetwork(intId);
            setNetworksPopupOpen(false);
        },
        [switchNetwork]
    );

    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    // TODO: i18n
    const chainName = chain?.name || "Unknown";
    const supportedChain = !!chainId && !!SUPPORTED_CHAINS[chainId as ChainId];
    const Logo = supportedChain
        ? SUPPORTED_CHAINS[chainId as ChainId].logo
        : Error;
    return (
        <>
            <Popover
                open={networksPopupOpen}
                anchor={anchorRef.current}
                ref={popoverRef}
                className={{ root: "p-4 flex flex-col gap-4" }}
                offset={POPOVER_OFFSET}
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
            <div className="flex items-center">
                <div
                    className="flex items-center mr-8 cursor-pointer"
                    onClick={handleOpenNetworksPopover}
                    ref={anchorRef}
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
                    <div className="flex flex-col mr-4">
                        <span className="font-mono text-black text-2xs">
                            {t("connect.wallet.network")}
                        </span>
                        <span className="font-mono text-sm text-black capitalize">
                            {supportedChain ? chainName : "Unsupported"}
                        </span>
                    </div>
                    <CaretDown className="w-3" />
                </div>
                {!!address ? (
                    <>
                        <Button size="small" onClick={openAccountModal}>
                            <div className="flex items-center text-base">
                                <img
                                    className="w-8 h-8 mr-6 rounded-full"
                                    src={
                                        /* ensAvatar ||  */ makeBlockie(address)
                                    }
                                />
                                {/* ensName ||  */ shortenAddress(address)}
                            </div>
                        </Button>
                    </>
                ) : (
                    <Button onClick={openConnectModal}>
                        {t("connect.wallet")}
                    </Button>
                )}
            </div>
        </>
    );
};
