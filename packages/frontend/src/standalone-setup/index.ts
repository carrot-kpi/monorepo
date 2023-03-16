import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { SUPPORTED_CHAINS } from "../constants";
import { ReadonlyConnector } from "../connectors";
import { Chain, ChainProviderFn, Connector } from "wagmi";
import { FrameConnector } from "../connectors/frame";

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
                shimDisconnect: true,
                name(detectedName) {
                    return detectedName
                        ? typeof detectedName === "string"
                            ? `Injected (${detectedName})`
                            : `Injected (${detectedName.join(", ")})`
                        : "Injected";
                },
            },
        }),
        new MetaMaskConnector({
            chains: standaloneSupportedChains,
            options: {
                shimChainChangedDisconnect: true,
                shimDisconnect: true,
            },
        }),
        new FrameConnector({
            chains: standaloneSupportedChains,
            options: {},
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
