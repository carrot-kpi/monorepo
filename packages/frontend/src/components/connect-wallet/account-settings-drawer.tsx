import {
    animated,
    config as springConfig,
    useTransition,
} from "@react-spring/web";
import { cva } from "class-variance-authority";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Avatar } from "./avatar";
import { Typography } from "@carrot-kpi/ui";
import { useAccount, useConnect } from "wagmi";
import { ChainSelect } from "../chain-select/chain-select";
import X from "../../icons/x";
import { useClickAway } from "react-use";
import Power from "../../icons/power";
import { Actions } from "./actions";
import { shortenAddress } from "../../utils/address";
import Settings from "../../icons/settings";
import Arrow from "../../icons/arrow";
import { useTranslation } from "react-i18next";
import Link from "../../icons/link";
import { Preferences } from "./preferences";
import { READONLY_CONNNECTOR_ID } from "../../connectors";
import { WalletConnectors } from "./wallet-connectors";

const overlayStyles = cva([
    "fixed",
    "h-full",
    "w-full",
    "top-0",
    "left-0",
    "z-10",
    "bg-black",
    "bg-opacity-50",
]);

const rootStyles = cva([
    "flex",
    "fixed",
    "h-screen",
    "w-[600px]",
    "overflow-hidden",
    "right-0",
    "top-0",
    "z-10",
]);

const containerStyles = cva([
    "z-10",
    "bg-white",
    "dark:bg-black",
    "sticky",
    "rounded-tl-xl",
    "w-[600px]",
    "h-full",
    "px-11",
    "py-7",
]);

interface AccountSettingsDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const AccountSettingsDrawer = ({
    open,
    onClose,
}: AccountSettingsDrawerProps) => {
    const { t } = useTranslation();
    const { address, chain } = useAccount();
    const { connectors, connect } = useConnect();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const drawerRef = useRef<HTMLDivElement>(null);

    const readonlyConnector = useMemo(() => {
        return connectors.find(
            (connector) => connector.id === READONLY_CONNNECTOR_ID,
        );
    }, [connectors]);
    const blockExplorerHref = useMemo(() => {
        if (!address || !chain || !chain.blockExplorers) return "";
        return `${chain.blockExplorers.default.url}/address/${address}`;
    }, [address, chain]);

    const transitions = useTransition(open, {
        config: {
            ...springConfig.default,
            duration: 150,
        },
        from: { transform: "translateX(100%)", opacity: 0 },
        enter: { transform: "translateX(0%)", opacity: 1 },
        leave: { transform: "translateX(100%)", opacity: 0 },
    });

    useClickAway(drawerRef, () => {
        onClose();
    });

    const handleDisconnectClick = useCallback(() => {
        if (!!readonlyConnector)
            connect({ connector: readonlyConnector, chainId: chain?.id });
        onClose();
    }, [connect, onClose, readonlyConnector, chain?.id]);

    const handleSettingsOpenClick = useCallback(() => {
        setSettingsOpen(true);
    }, []);
    const handleSettingsCloseClick = useCallback(() => {
        setSettingsOpen(false);
    }, []);

    return transitions(
        (style, item) =>
            item && (
                <>
                    <animated.div
                        style={{ opacity: style.opacity }}
                        className={overlayStyles()}
                    />
                    <div ref={drawerRef} className={rootStyles()}>
                        <animated.div
                            style={{ transform: style.transform }}
                            className="flex w-full"
                        >
                            <div className="flex items-center justify-center h-11 w-11 mt-6 mr-3 bg-white rounded-full flex-shrink-0 cursor-pointer">
                                <X className="h-7" onClick={onClose} />
                            </div>
                            <div className={containerStyles()}>
                                {settingsOpen ? (
                                    <div className="flex flex-col gap-6">
                                        <div className="flex w-full">
                                            <Arrow
                                                className="w-7 h-7 -rotate-180 cursor-pointer dark:text-white"
                                                onClick={
                                                    handleSettingsCloseClick
                                                }
                                            />
                                            <div className="flex justify-center items-center w-full">
                                                <Typography
                                                    uppercase
                                                    weight="bold"
                                                >
                                                    {t("settings.title")}
                                                </Typography>
                                            </div>
                                        </div>
                                        <Preferences />
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center">
                                                {address ? (
                                                    <div className="flex items-center gap-6">
                                                        <Avatar
                                                            address={address}
                                                            variant="lg"
                                                        />
                                                        <Typography>
                                                            {shortenAddress(
                                                                address,
                                                            )}
                                                        </Typography>
                                                        <a
                                                            href={
                                                                blockExplorerHref ||
                                                                ""
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Link className="w-7 h-7 -ml-1.5" />
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center items-center w-full">
                                                        <Typography
                                                            uppercase
                                                            weight="bold"
                                                        >
                                                            {t(
                                                                "connect.wallet.title",
                                                            )}
                                                        </Typography>
                                                    </div>
                                                )}
                                                <div className="flex ml-auto items-center gap-4">
                                                    <Settings
                                                        data-testid="settings-button"
                                                        className="h-7 w-7 stroke-0 cursor-pointer dark:text-white"
                                                        onClick={
                                                            handleSettingsOpenClick
                                                        }
                                                    />
                                                    {address && (
                                                        <Power
                                                            data-testid="disconnect-button"
                                                            className="h-7 w-7 cursor-pointer dark:text-white"
                                                            onClick={
                                                                handleDisconnectClick
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {address && (
                                                <ChainSelect compact={false} />
                                            )}
                                        </div>
                                        {address ? (
                                            <Actions />
                                        ) : (
                                            <WalletConnectors />
                                        )}
                                    </div>
                                )}
                            </div>
                        </animated.div>
                    </div>
                </>
            ),
    );
};
