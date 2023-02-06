import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectWalletButton } from "./button";

// TODO: handle loading
export const ConnectWallet = () => {
    return __PREVIEW_MODE__ ? (
        <ConnectWalletButton />
    ) : (
        <ConnectButton.Custom>
            {({ openConnectModal, openAccountModal, openChainModal }) => {
                return (
                    <ConnectWalletButton
                        openConnectModal={openConnectModal}
                        openAccountModal={openAccountModal}
                        openChainModal={openChainModal}
                    />
                );
            }}
        </ConnectButton.Custom>
    );
};
