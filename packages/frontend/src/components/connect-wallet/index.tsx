import React from "react";
import { Button } from "@carrot-kpi/ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";

export const ConnectWallet = () => {
    const { t } = useTranslation();
    return (
        <ConnectButton.Custom>
            {({ openConnectModal }) => {
                return (
                    <Button className="uppercase" onClick={openConnectModal}>
                        {t("connect.wallet")}
                    </Button>
                );
            }}
        </ConnectButton.Custom>
    );
};
