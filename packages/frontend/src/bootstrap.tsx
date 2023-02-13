import "./i18n";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@carrot-kpi/ui/styles.css";

import "./global.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";

import { Chain, ChainProviderFn, Connector } from "wagmi";
import { ThemeUpdater } from "./updaters";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";
import { SUPPORTED_CHAINS } from "./constants";
import { ReadonlyConnector } from "./connectors";
import { App } from "./pages/app";
import { CarrotCoreProvider } from "@carrot-kpi/react";

const INFURA_PROJECT_ID = "0ebf4dd05d6740f482938b8a80860d13";

// eslint-disable-next-line @typescript-eslint/no-empty-function
let standaloneSupportedChains: Chain[] = [];
let standaloneProviders: ChainProviderFn[] = [];
let getStandaloneConnectors: () => Connector[] = () => [];
if (!__PREVIEW_MODE__) {
    standaloneSupportedChains = Object.values(SUPPORTED_CHAINS);
    standaloneProviders = [infuraProvider({ apiKey: INFURA_PROJECT_ID })];
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

interface RootProps {
    supportedChains?: Chain[];
    providers?: ChainProviderFn[];
    connectors?: () => Connector[];
    ipfsGatewayURL?: string;
    customBaseURL?: string;
    templateId?: number;
}

export const Root = ({
    supportedChains,
    providers,
    connectors,
    ipfsGatewayURL,
    customBaseURL,
    templateId,
}: RootProps) => {
    return (
        <StrictMode>
            <HashRouter>
                <ThemeUpdater />
                <CarrotCoreProvider
                    supportedChains={
                        supportedChains || standaloneSupportedChains
                    }
                    providers={providers || standaloneProviders}
                    getConnectors={connectors || getStandaloneConnectors}
                    ipfsGatewayURL={ipfsGatewayURL}
                >
                    <App
                        customBaseURL={customBaseURL}
                        templateId={templateId}
                    />
                </CarrotCoreProvider>
            </HashRouter>
        </StrictMode>
    );
};

if (!__PREVIEW_MODE__) {
    const container = document.getElementById("root");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(container!);
    root.render(<Root />);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
        navigator.serviceWorker
            .register(`/sw.js`)
            .then(() => {
                console.log("carrot service worker registered successfully");
            })
            .catch((error) => {
                console.error(
                    "could not register carrot service worker",
                    error
                );
            });
    }
}
