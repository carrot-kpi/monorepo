import React, { type FunctionComponent } from "react";
import FrameIcon from "../icons/connectors/frame";
import WalletConnectIcon from "../icons/connectors/wallet-connect";
import CoinbaseWalletIcon from "../icons/connectors/coinbase-wallet";
import InjectedIcon from "../icons/connectors/injected";
import CarrotIcon from "../icons/connectors/carrot";
import { TEMPLATES_TESTING_CONNECTOR_ID } from "./templates-testing";
import type { Connector } from "wagmi";
import type { SVGIcon } from "../icons/types";

export * from "./readonly";

export const getConnectorIcon = (
    connector: Connector,
): FunctionComponent<SVGIcon> | null => {
    if (connector.icon) {
        const Icon = ({ width, height }: SVGIcon) => (
            <img
                className=""
                src={connector.icon}
                width={width}
                height={height}
            />
        );
        return Icon;
    }

    switch (connector.id) {
        case TEMPLATES_TESTING_CONNECTOR_ID:
            return CarrotIcon;
        case "injected": {
            return InjectedIcon;
        }
        case "frame": {
            return FrameIcon;
        }
        case "walletConnect": {
            return WalletConnectIcon;
        }
        case "coinbaseWalletSDK": {
            return CoinbaseWalletIcon;
        }
        default: {
            return null;
        }
    }
};
