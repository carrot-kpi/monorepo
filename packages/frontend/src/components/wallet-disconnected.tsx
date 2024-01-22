import React from "react";
import { t } from "i18next";
import WalletDisconnectedIcon from "../icons/wallet-disconnected";
import { Typography } from "@carrot-kpi/ui";
import { ConnectWallet } from "./connect-wallet";

export const WalletDisconnected = () => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <WalletDisconnectedIcon className="w-52" />
            <div className="flex flex-col gap-3 items-center mb-4">
                <Typography data-testid="wallet-disconnected-text" variant="h4">
                    {t("wallet.disconnected.title")}
                </Typography>
                <Typography data-testid="connect-wallet-required-text">
                    {t("wallet.disconnected.description")}
                </Typography>
            </div>
            <ConnectWallet
                className={{
                    connectButton: "h-11 px-3 w-full xl:w-fit rounded-lg",
                }}
                chainList={false}
            />
        </div>
    );
};
