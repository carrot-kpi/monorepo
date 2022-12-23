import React, { useEffect, useState } from "react";
import { Button } from "@carrot-kpi/ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { shortenAddress } from "../../utils/address";
import makeBlockie from "ethereum-blockies-base64";
import { SUPPORTED_CHAINS } from "../../constants";
import { ChainId } from "@carrot-kpi/sdk";

// TODO: handle loading
export const ConnectWallet = () => {
    const { t } = useTranslation();
    const { isConnected, address } = useAccount();
    const { isLoading: loadingEnsName, data: ensName } = useEnsName({
        address,
    });
    const { isLoading: loadingEnsAvatar, data: ensAvatar } = useEnsAvatar({
        address,
    });
    const [, /* loading, */ setLoading] = useState(false);

    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (!address) return;
        if (!!ensAvatar) setAvatar(ensAvatar);
        else setAvatar(makeBlockie(address));
    }, [address, ensAvatar]);

    useEffect(() => {
        setLoading(loadingEnsAvatar || loadingEnsName);
    }, [loadingEnsAvatar, loadingEnsName, setLoading]);

    return (
        <ConnectButton.Custom>
            {({ openConnectModal, openChainModal, chain }) => {
                const Logo = !!chain
                    ? SUPPORTED_CHAINS[chain.id as ChainId].logo
                    : null;
                return (
                    <div className="flex items-center">
                        <div className="flex items-center mr-8">
                            {!!chain && !!Logo ? (
                                <div
                                    className="flex items-center justify-center w-8 h-8 mr-2 rounded-lg"
                                    style={{
                                        backgroundColor:
                                            SUPPORTED_CHAINS[
                                                chain.id as ChainId
                                            ].iconBackgroundColor,
                                    }}
                                >
                                    <Logo className="w-4 h-4" />
                                </div>
                            ) : (
                                <div className="w-8 h-8 mr-2 rounded-lg bg-black" />
                            )}
                            <div className="flex flex-col">
                                <span className="text-black font-mono text-2xs">
                                    {t("connect.wallet.network")}
                                </span>
                                <span className="text-black font-mono text-sm">
                                    {chain?.name}
                                </span>
                            </div>
                        </div>
                        {isConnected ? (
                            <>
                                <Button size="small" onClick={openChainModal}>
                                    <div className="flex items-center text-base">
                                        <img
                                            className="w-8 h-8 mr-6 rounded-full"
                                            src={avatar}
                                        />
                                        {ensName || shortenAddress(address)}
                                    </div>
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="uppercase"
                                onClick={openConnectModal}
                            >
                                {t("connect.wallet")}
                            </Button>
                        )}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
