import "./i18n";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@carrot-kpi/switzer-font/400.css";
import "@carrot-kpi/switzer-font/500.css";
import "@carrot-kpi/switzer-font/700.css";
import "@carrot-kpi/ui/styles.css";

import "./global.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { createConfig, configureChains, Connector } from "wagmi";
import { SharedEntrypoint } from "./shared-entrypoint";
import { ENABLED_CHAINS, IPFS_GATEWAY_URL, RPC_BY_CHAIN } from "./constants";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import type { ChainId } from "@carrot-kpi/sdk";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { FrameConnector } from "./connectors/frame";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { ReadonlyConnector } from "./connectors";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { HashRouter } from "react-router-dom";
import { HostStateProvider } from "./state/connector";
import { ReactSharedStateProvider } from "@carrot-kpi/shared-state";
import {
    useSetDevMode,
    useSetIPFSGatewayURL,
    useSetStagingMode,
} from "@carrot-kpi/react";

console.log(
    `Carrot host frontend running in ${
        __STAGING_MODE__ ? "staging" : "standard"
    } mode`,
);

const supportedChains = Object.values(ENABLED_CHAINS);

const { chains, publicClient, webSocketPublicClient } = configureChains(
    supportedChains,
    [
        infuraProvider({ apiKey: __INFURA_PROJECT_ID__ }),
        jsonRpcProvider({
            rpc: (chain) => {
                return RPC_BY_CHAIN[chain.id as ChainId] || null;
            },
        }),
    ],
    { stallTimeout: 60_000 },
);

const connectors: Connector[] = [
    new InjectedConnector({
        chains,
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
        chains,
        options: {
            shimDisconnect: true,
        },
    }),
    new FrameConnector({
        chains,
    }),
    new CoinbaseWalletConnector({
        chains,
        options: {
            appName: "Carrot KPI",
            darkMode: true,
        },
    }),
    new ReadonlyConnector({
        chains,
    }),
];

if (!!__WALLETCONNECT_PROJECT_ID__) {
    connectors.push(
        new WalletConnectConnector({
            chains,
            options: { projectId: __WALLETCONNECT_PROJECT_ID__ },
        }),
    );
}

const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export const Root = () => {
    const setDevMode = useSetDevMode();
    const setStagingMode = useSetStagingMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();

    setDevMode(false);
    setStagingMode(__STAGING_MODE__);
    setIPFSGatewayURL(IPFS_GATEWAY_URL);

    return (
        <SharedEntrypoint
            config={config}
            enableFathom={__PROD__ && !__STAGING_MODE__}
        />
    );
};

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
    <StrictMode>
        <HashRouter>
            <HostStateProvider>
                <ReactSharedStateProvider>
                    <Root />
                </ReactSharedStateProvider>
            </HostStateProvider>
        </HashRouter>
    </StrictMode>,
);

if (__PROD__ && "serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .then(() => {
            console.log("Carrot service worker registered successfully");
        })
        .catch((error) => {
            console.error("Could not register Carrot service worker", error);
        });
}
