import {
    animated,
    config as springConfig,
    useTransition,
} from "@react-spring/web";
import { cva } from "class-variance-authority";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Avatar } from "./avatar";
import { Typography } from "@carrot-kpi/ui";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { ChainSelect } from "../chain-select/chain-select";
import { useClickAway } from "react-use";
import Power from "../../icons/power";
import { Actions } from "./actions";
import { ReadonlyConnector } from "../../connectors";
import Settings from "../../icons/settings";
import Arrow from "../../icons/arrow";
import { useTranslation } from "react-i18next";
import { Preferences } from "./preferences";

const overlayStyles = cva([
    "fixed",
    "h-full",
    "w-full",
    "bottom-0",
    "z-9",
    "bg-black",
    "bg-opacity-50",
]);

const rootStyles = cva([
    "flex",
    "fixed",
    "h-[500px]",
    "w-full",
    "overflow-hidden",
    "right-0",
    "top-0",
    "bottom-0",
    "z-10",
]);

const containerStyles = cva([
    "z-10",
    "bg-white",
    "dark:bg-black",
    "sticky",
    "rounded-t-xl",
    "w-full",
    "h-[600px]",
    "px-11",
    "py-7",
]);

interface AccountSettingsDrawerMobileProps {
    open: boolean;
    onClose: () => void;
}

export const AccountSettingsDrawerMobile = ({
    open,
    onClose,
}: AccountSettingsDrawerMobileProps) => {
    const { t } = useTranslation();
    const { address } = useAccount();
    const { chain } = useNetwork();
    const { connectors, connect } = useConnect();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const drawerRef = useRef<HTMLDivElement>(null);

    const readonlyConnector = useMemo(() => {
        return connectors.find(
            (connector) => connector instanceof ReadonlyConnector,
        );
    }, [connectors]);
    const blockExplorerHref = useMemo(() => {
        if (!address || !chain || !chain.blockExplorers) return "";
        return `${chain.blockExplorers.default.url}/address/${address}`;
    }, [address, chain]);

    useEffect(() => {
        if (!open) return;
        document.documentElement.classList.add("overflow-y-hidden");
        return () => {
            document.documentElement.classList.remove("overflow-y-hidden");
        };
    }, [open]);

    const transitions = useTransition(open, {
        config: {
            ...springConfig.default,
            duration: 150,
        },
        from: { transform: "translateY(100%)", opacity: 0 },
        enter: { transform: "translateY(0%)", opacity: 1 },
        leave: { transform: "translateY(100%)", opacity: 0 },
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
                    <div ref={drawerRef} className={rootStyles()}>
                        <animated.div
                            style={{ opacity: style.opacity }}
                            onClick={onClose}
                            className={overlayStyles()}
                        />
                        <animated.div
                            style={{ transform: style.transform }}
                            className="fixed bottom-0 flex w-full"
                        >
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
                                        <div className="h-[500px]">
                                            <Preferences />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6">
                                        {address && (
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <a
                                                        href={
                                                            blockExplorerHref ||
                                                            ""
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Avatar
                                                            address={address}
                                                            variant="lg"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="flex gap-4">
                                                    <Settings
                                                        data-testid="settings-button"
                                                        className="w-7 h-7 stroke-0 cursor-pointer dark:text-white"
                                                        onClick={
                                                            handleSettingsOpenClick
                                                        }
                                                    />
                                                    <Power
                                                        data-testid="disconnect-button"
                                                        className="w-7 h-7 cursor-pointer dark:text-white"
                                                        onClick={
                                                            handleDisconnectClick
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <ChainSelect compact={false} />
                                        <Actions />
                                    </div>
                                )}
                            </div>
                        </animated.div>
                    </div>
                </>
            ),
    );
};
