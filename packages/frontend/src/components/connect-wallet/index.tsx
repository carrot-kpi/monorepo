import React, { useEffect, useState } from "react";
import { Button } from "@carrot-kpi/ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";
import { shortenAddress } from "../../utils/address";
import makeBlockie from "ethereum-blockies-base64";
import { SUPPORTED_CHAINS } from "../../constants";
import { ChainId } from "@carrot-kpi/sdk";
import { ReactComponent as CaretDown } from "../../assets/caret-down.svg";
import { useClient } from "wagmi";
import { ReactComponent as Error } from "../../assets/error.svg";

interface ChainData {
    id: ChainId;
    name: string;
}

// TODO: handle loading
export const ConnectWallet = () => {
    const { t } = useTranslation();
    const { provider } = useClient();

    const [chainDataFromProvider, setChainDataFromProvider] =
        useState<ChainData>();

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            const { chainId, name } = await provider.getNetwork();
            if (!cancelled) setChainDataFromProvider({ id: chainId, name });
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [provider]);

    return (
        <ConnectButton.Custom>
            {({
                openConnectModal,
                openAccountModal,
                openChainModal,
                account,
                chain,
            }) => {
                const chainId = chain?.id || chainDataFromProvider?.id;
                const chainName = chain?.name || chainDataFromProvider?.name;
                const supportedChain =
                    !!chainId && !!SUPPORTED_CHAINS[chainId as ChainId];
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
                        {!!account ? (
                            <>
                                <Button size="small" onClick={openAccountModal}>
                                    <div className="flex items-center text-base">
                                        <img
                                            className="w-8 h-8 mr-6 rounded-full"
                                            src={
                                                account.ensAvatar ||
                                                makeBlockie(account.address)
                                            }
                                        />
                                        {account.ensName ||
                                            shortenAddress(account.address)}
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
            }}
        </ConnectButton.Custom>
    );
};
