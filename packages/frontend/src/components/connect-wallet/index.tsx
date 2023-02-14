import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectWalletButton } from "./button";

interface ConnectWalletProps {
    mode?: "standard" | "modal";
    onDismiss?: () => void;
}

// TODO: handle loading
export const ConnectWallet = ({
    mode = "standard",
    onDismiss,
}: ConnectWalletProps) => {
    return __PREVIEW_MODE__ ? (
        <ConnectWalletButton mode={mode} onDismiss={onDismiss} />
    ) : (
        <ConnectButton.Custom>
            {({ openConnectModal, openAccountModal }) => {
                return (
                    <ConnectWalletButton
                        mode={mode}
                        onDismiss={onDismiss}
                        openConnectModal={openConnectModal}
                        openAccountModal={openAccountModal}
                    />
                );
            }}
        </ConnectButton.Custom>
    );
};
