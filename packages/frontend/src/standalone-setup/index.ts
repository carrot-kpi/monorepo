import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { SUPPORTED_CHAINS } from "../constants";
import { ReadonlyConnector } from "../connectors";
import { Chain, ChainProviderFn, Connector } from "wagmi";

const INFURA_PROJECT_ID = "0ebf4dd05d6740f482938b8a80860d13";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export let standaloneSupportedChains: Chain[] = [];
export let standaloneProviders: ChainProviderFn[] = [];
export let getStandaloneConnectors: () => Connector[] = () => [];
if (!__PREVIEW_MODE__) {
    standaloneSupportedChains = Object.values(SUPPORTED_CHAINS);
    standaloneProviders = [
        infuraProvider({ apiKey: INFURA_PROJECT_ID }),
        jsonRpcProvider({
            rpc: () => {
                return {
                    http: "https://rpc.gnosischain.com",
                    webSocket: "wss://rpc.gnosischain.com/wss",
                };
            },
        }),
    ];
    getStandaloneConnectors = () => [
        new InjectedConnector({
            chains: standaloneSupportedChains,
            options: {
                shimChainChangedDisconnect: true,
                name(detectedName) {
                    return detectedName
                        ? typeof detectedName === "string"
                            ? detectedName
                            : detectedName.join(", ")
                        : "Browser Wallet";
                },
            },
        }),
        new WalletConnectConnector({
            chains: standaloneSupportedChains,
            options: {
                qrcode: true,
            },
        }),
        new CoinbaseWalletConnector({
            chains: standaloneSupportedChains,
            options: {
                appName: "Carrot KPI",
                darkMode: true,
            },
        }),
        new ReadonlyConnector({
            chains: standaloneSupportedChains,
            options: { name: "readonly" },
        }),
    ];
}
