import MetamaskIcon from "../icons/connectors/metamask";
import FrameIcon from "../icons/connectors/frame";
import WalletConnectIcon from "../icons/connectors/wallet-connect";
import CoinbaseWalletIcon from "../icons/connectors/coinbase-wallet";
import InjectedIcon from "../icons/connectors/injected";
import CarrotIcon from "../icons/connectors/carrot";
import { TEMPLATE_TESTING_CONNECTOR_ID } from "./template-testing";
import { FRAME_CONNECTOR_ID } from "./frame";

export * from "./readonly";

export const getConnectorIcon = (connectorId: string) => {
    switch (connectorId) {
        case TEMPLATE_TESTING_CONNECTOR_ID:
            return CarrotIcon;
        case "injected": {
            return InjectedIcon;
        }
        case FRAME_CONNECTOR_ID: {
            return FrameIcon;
        }
        case "metaMask": {
            return MetamaskIcon;
        }
        case "walletConnect": {
            return WalletConnectIcon;
        }
        case "coinbaseWallet": {
            return CoinbaseWalletIcon;
        }
        default: {
            return null;
        }
    }
};
