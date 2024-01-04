import {
    animated,
    config as springConfig,
    useTransition,
} from "@react-spring/web";
import { cva } from "class-variance-authority";
import React, { useCallback, useMemo, useRef } from "react";
import { Avatar } from "./avatar";
import { Typography } from "@carrot-kpi/ui";
import { shortenAddress } from "src/utils/address";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { ChainSelect } from "../chain-select/chain-select";
import X from "src/icons/x";
import { useClickAway } from "react-use";
import Power from "src/icons/power";
import { ReadonlyConnector } from "src/connectors";
import External from "src/icons/external";
import { Actions } from "./actions";

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
    "w-[520px]",
    "overflow-hidden",
    "right-0",
    "top-0",
    "z-10",
]);

const containerStyles = cva([
    "z-10",
    "bg-white",
    "sticky",
    "rounded-tl-xl",
    "w-[520px]",
    "h-full",
    "px-11",
    "py-7",
]);

interface SettingsDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const SettingsDrawer = ({ open, onClose }: SettingsDrawerProps) => {
    const { address } = useAccount();
    const { chain } = useNetwork();
    const { connectors, connect } = useConnect();

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
                                <X className="h-6" onClick={onClose} />
                            </div>
                            <div className={containerStyles()}>
                                <div className="flex flex-col gap-6">
                                    {address && (
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    address={address}
                                                    variant="lg"
                                                />
                                                <Typography>
                                                    {shortenAddress(address)}
                                                </Typography>
                                                <a
                                                    href={
                                                        blockExplorerHref || ""
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <External className="w-5 h-5" />
                                                </a>
                                            </div>
                                            <Power
                                                className="w-7 h-7 cursor-pointer"
                                                onClick={handleDisconnectClick}
                                            />
                                        </div>
                                    )}
                                    <ChainSelect compact={false} />
                                    <Actions />
                                </div>
                            </div>
                        </animated.div>
                    </div>
                </>
            ),
    );
};
