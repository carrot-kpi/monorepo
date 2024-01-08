import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@carrot-kpi/ui";
import { useAccount } from "wagmi";
import { ConnectPopover } from "./connect-popover";
import { Avatar } from "./avatar";
import { cva } from "class-variance-authority";
import { shortenAddress } from "../../utils/address";
import { AccountSettingsDrawer } from "./account-settings-drawer";
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
    const { address } = useAccount();
    const [connectWallet, setConnectWallet] =
        useState<HTMLButtonElement | null>(null);

    const connectPopoverRef = useRef<HTMLDivElement>(null);

    const [connectPopoverOpen, setConnectPopoverOpen] = useState(false);
    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (
                connectPopoverRef.current &&
                !connectPopoverRef.current.contains(event.target as Node)
            )
                setConnectPopoverOpen(false);
        };
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    const handleConnectPopoverOpen = useCallback(() => {
        setConnectPopoverOpen(true);
    }, []);

    const handleConnectPopoverClose = useCallback(() => {
        setConnectPopoverOpen(false);
    }, []);

    const handleSettingsDrawerOpen = useCallback(() => {
        setSettingsDrawerOpen(true);
    }, []);

    const handleSettingsDrawerClose = useCallback(() => {
        setSettingsDrawerOpen(false);
    }, []);

    return (
        <>
            <AccountSettingsDrawer
                open={settingsDrawerOpen}
                onClose={handleSettingsDrawerClose}
            />
            <ConnectPopover
                open={connectPopoverOpen}
                anchor={connectWallet}
                onClose={handleConnectPopoverClose}
                ref={connectPopoverRef}
            />
            <div className={rootStyles({ className: className?.root })}>
                {address ? (
                    <>
                        <ChainSelect />
                        <div
                            className="flex gap-2 cursor-pointer items-center border border-black dark:border-white px-[10px] rounded-lg"
                            onClick={handleSettingsDrawerOpen}
                        >
                            <Avatar address={address} />
                            <Typography>{shortenAddress(address)}</Typography>
                        </div>
                    </>
                ) : (
                    <Button
                        data-testid="connect-wallet-button"
                        size="small"
                        ref={setConnectWallet}
                        onClick={handleConnectPopoverOpen}
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
