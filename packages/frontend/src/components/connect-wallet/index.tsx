import React, { useEffect, useState } from "react";
import { Button } from "@carrot-kpi/ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { shortenAddress } from "../../utils/address";
import makeBlockie from "ethereum-blockies-base64";

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
            {({ openConnectModal, openChainModal }) => {
                return isConnected ? (
                    <>
                        <Button onClick={openChainModal}>
                            <div className="flex items-center animate-pulse">
                                <img
                                    className="w-8 h-8 mr-6 rounded-full"
                                    src={avatar}
                                />
                                {ensName || shortenAddress(address)}
                            </div>
                        </Button>
                    </>
                ) : (
                    <Button className="uppercase" onClick={openConnectModal}>
                        {t("connect.wallet")}
                    </Button>
                );
            }}
        </ConnectButton.Custom>
    );
};
