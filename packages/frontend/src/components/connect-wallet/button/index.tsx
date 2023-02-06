import { ChainId } from "@carrot-kpi/sdk";
import React from "react";
import { SUPPORTED_CHAINS } from "../../../constants";
import { ReactComponent as Error } from "../../../assets/error.svg";
import { ReactComponent as CaretDown } from "../../../assets/caret-down.svg";
import { useTranslation } from "react-i18next";
import { Button } from "@carrot-kpi/ui";
import { useNetwork, useAccount } from "wagmi";
import makeBlockie from "ethereum-blockies-base64";
import { shortenAddress } from "../../../utils/address";

interface ConnectWalletButtonProps {
    openConnectModal?: () => void;
    openAccountModal?: () => void;
    openChainModal?: () => void;
}

// TODO: implement loading states
export const ConnectWalletButton = ({
    openConnectModal,
    openAccountModal,
    openChainModal,
}: ConnectWalletButtonProps) => {
    const { t } = useTranslation();
    const { chain } = useNetwork();
    const { address } = useAccount();
    // const { data: ensName } = useEnsName({
    //     address,
    // });
    // const { data: ensAvatar } = useEnsAvatar({
    //     address,
    // });

    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    // TODO: i18n
    const chainName = chain?.name || "Unknown";
    const supportedChain = !!chainId && !!SUPPORTED_CHAINS[chainId as ChainId];
    const Logo = supportedChain
        ? SUPPORTED_CHAINS[chainId as ChainId].logo
        : Error;
    return (
        <div className="flex items-center">
            <div
                className="flex items-center mr-8 cursor-pointer"
                onClick={openChainModal}
            >
                <div
                    className="flex items-center justify-center w-8 h-8 mr-2 rounded-lg"
                    style={{
                        backgroundColor: supportedChain
                            ? SUPPORTED_CHAINS[chainId as ChainId]
                                  .iconBackgroundColor
                            : "#ff0000",
                    }}
                >
                    <div className="flex items-center justify-center">
                        <Logo width={18} height={18} />
                    </div>
                </div>
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
                                src={/* ensAvatar ||  */ makeBlockie(address)}
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
    );
};
