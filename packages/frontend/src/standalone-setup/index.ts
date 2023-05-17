import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ENABLED_CHAINS } from "../constants";
import { ReadonlyConnector } from "../connectors";
import { Chain, ChainProviderFn, Connector } from "wagmi";
import { FrameConnector } from "../connectors/frame";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export let standaloneSupportedChains: Chain[] = [];
export let standaloneProviders: ChainProviderFn[] = [];
export let getStandaloneConnectors: () => Connector[] = () => [];
if (!__LIBRARY_MODE__) {
    standaloneSupportedChains = Object.values(ENABLED_CHAINS);
    standaloneProviders = [
        infuraProvider({ apiKey: __INFURA_PROJECT_ID__ }),
        jsonRpcProvider({
            rpc: () => {
                return {
                    http: "https://rpc.gnosischain.com",
                    webSocket: "wss://rpc.gnosischain.com/wss",
                };
            },
        }),
    ];

    const connectors: Connector[] = [
        new InjectedConnector({
            chains: standaloneSupportedChains,
            options: {
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
                shimDisconnect: true,
            },
        }),
        new FrameConnector({
            chains: standaloneSupportedChains,
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
        }),
    ];

    if (!!__WALLETCONNECT_PROJECT_ID__) {
        connectors.push(
            new WalletConnectConnector({
                chains: standaloneSupportedChains,
                options: { projectId: __WALLETCONNECT_PROJECT_ID__ },
            })
        );
    }

    getStandaloneConnectors = () => connectors;
}
