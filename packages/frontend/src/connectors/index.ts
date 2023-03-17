import { ReactComponent as MetamaskIcon } from "../assets/connectors/metamask.svg";
import { ReactComponent as FrameIcon } from "../assets/connectors/frame.svg";
import { ReactComponent as WalletConnectIcon } from "../assets/connectors/wallet-connect.svg";
import { ReactComponent as CoinbaseWalletIcon } from "../assets/connectors/coinbase-wallet.svg";
import { ReactComponent as InjectedIcon } from "../assets/connectors/injected.svg";
import { ReactComponent as CarrotIcon } from "../assets/connectors/carrot.svg";
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
