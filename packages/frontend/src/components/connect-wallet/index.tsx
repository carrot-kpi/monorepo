import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@carrot-kpi/ui";
import { useAccount } from "wagmi";
import { Avatar } from "./avatar";
import { cva } from "class-variance-authority";
import { shortenAddress } from "../../utils/address";
import { AccountSettingsDrawer } from "./account-settings-drawer";
import { AccountSettingsDrawerMobile } from "./account-settings-drawer-mobile";
import { useWindowSize } from "react-use";
import { ChainSelect } from "../chain-select/chain-select";

const rootStyles = cva([
    "flex",
    "gap-2",
    "bg-white",
    "dark:bg-black",
    "border",
    "border-black",
    "dark:border-white",
    "py-3",
    "px-[10px]",
    "rounded-xl",
]);

interface ConnectWalletProps {
    chainList?: boolean;
    className?: {
        root?: string;
        connectButton?: string;
    };
}

export const ConnectWallet = ({ className }: ConnectWalletProps) => {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const { address } = useAccount();

    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

    const handleSettingsDrawerOpen = useCallback(() => {
        setSettingsDrawerOpen(true);
    }, []);

    const handleSettingsDrawerClose = useCallback(() => {
        setSettingsDrawerOpen(false);
    }, []);

    return (
        <>
            {/* TODO: add dedicated refs and callbacks to the different AccountSettingsDrawer components */}
            {width >= 768 ? (
                <AccountSettingsDrawer
                    open={settingsDrawerOpen}
                    onClose={handleSettingsDrawerClose}
                />
            ) : (
                <AccountSettingsDrawerMobile
                    open={settingsDrawerOpen}
                    onClose={handleSettingsDrawerClose}
                />
            )}
            <div className={rootStyles({ className: className?.root })}>
                <ChainSelect />
                {address ? (
                    <div
                        className="flex gap-2 cursor-pointer items-center border border-black dark:border-white px-[10px] rounded-lg"
                        onClick={handleSettingsDrawerOpen}
                    >
                        <Avatar address={address} />
                        <Typography className={{ root: "hidden md:block" }}>
                            {shortenAddress(address)}
                        </Typography>
                    </div>
                ) : (
                    <Button
                        data-testid="connect-wallet-button"
                        size="small"
                        onClick={handleSettingsDrawerOpen}
                        className={{
                            root: className?.connectButton,
                        }}
                    >
                        {t("connect.wallet")}
                    </Button>
                )}
            </div>
        </>
    );
};
