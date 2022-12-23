import React from "react";
import { Button } from "@carrot-kpi/ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";
import { shortenAddress } from "../../utils/address";
import makeBlockie from "ethereum-blockies-base64";
import { SUPPORTED_CHAINS } from "../../constants";
import { ChainId } from "@carrot-kpi/sdk";
import { ReactComponent as CaretDown } from "../../assets/caret-down.svg";

// TODO: handle loading
export const ConnectWallet = () => {
    const { t } = useTranslation();

    return (
        <ConnectButton.Custom>
            {({
                openConnectModal,
                openAccountModal,
                openChainModal,
                account,
                chain,
            }) => {
                const Logo = !!chain
                    ? SUPPORTED_CHAINS[chain.id as ChainId].logo
                    : null;
                return (
                    <div className="flex items-center">
                        <div
                            className="flex items-center mr-8 cursor-pointer"
                            onClick={openChainModal}
                        >
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
                            <div className="flex flex-col mr-4">
                                <span className="text-black font-mono text-2xs">
                                    {t("connect.wallet.network")}
                                </span>
                                <span className="text-black font-mono text-sm">
                                    {chain?.name}
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
