import { ReactComponent as MetamaskIcon } from "../assets/connectors/metamask.svg";
import { ReactComponent as FrameIcon } from "../assets/connectors/frame.svg";
import { ReactComponent as WalletConnectIcon } from "../assets/connectors/wallet-connect.svg";
import { ReactComponent as CoinbaseWalletIcon } from "../assets/connectors/coinbase-wallet.svg";
import { ReactComponent as InjectedIcon } from "../assets/connectors/injected.svg";

export * from "./readonly";

export const getConnectorIcon = (connectorId: string, walletName: string) => {
    switch (connectorId) {
        case "injected": {
            if (walletName === "MetaMask") {
                return MetamaskIcon;
            } else if (walletName === "Frame") {
                return FrameIcon;
            } else {
                return InjectedIcon;
            }
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
