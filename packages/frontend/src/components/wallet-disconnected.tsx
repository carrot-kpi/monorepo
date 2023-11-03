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
                <Typography variant="h4">
                    {t("wallet.disconnected.title")}
                </Typography>
                <Typography>{t("wallet.disconnected.description")}</Typography>
            </div>
            <ConnectWallet chainList={false} />
        </div>
    );
};
