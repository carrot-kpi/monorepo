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
import { App } from "./pages/app";
import { CarrotCoreProvider } from "@carrot-kpi/react";
import {
    getStandaloneConnectors,
    standaloneProviders,
    standaloneSupportedChains,
} from "./standalone-setup";
import { QueryClient } from "@tanstack/react-query";
import { HostStateProvider } from "./state/connector";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { ReadonlyConnector } from "./connectors";
import { ThemeUpdater } from "./updaters/theme";
import { MultiChainLinksUpdater } from "./updaters/multi-chain-links";

export * from "./connectors/template-testing";

dayjs.extend(localizedFormat);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1_000 * 60 * 60 * 24, // 24 hours
            networkMode: "offlineFirst",
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

interface RootProps {
    supportedChains?: Chain[];
    providers?: ChainProviderFn[];
    getAdditionalConnectors?: () => Connector[];
    ipfsGatewayURL?: string;
    kpiTokenTemplateBaseURL?: string;
    oracleTemplateBaseURL?: string;
    templateId?: number;
}

export const Root = ({
    supportedChains,
    providers,
    getAdditionalConnectors,
    ipfsGatewayURL,
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    templateId,
}: RootProps) => {
    const resolvedSupportedChains =
        supportedChains || standaloneSupportedChains;

    const resolvedProviders = providers || standaloneProviders;

    let resolvedGetConnectors = getStandaloneConnectors;
    if (getAdditionalConnectors) {
        resolvedGetConnectors = () => {
            const connectors = getAdditionalConnectors();
            if (
                connectors.some(
                    (connector) => connector instanceof ReadonlyConnector
                )
            )
                return connectors;
            return [
                ...connectors,
                new ReadonlyConnector({
                    chains: resolvedSupportedChains,
                    options: { name: "readonly" },
                }),
            ];
        };
    }

    return (
        <HashRouter>
            <HostStateProvider>
                <CarrotCoreProvider
                    supportedChains={resolvedSupportedChains}
                    providers={resolvedProviders}
                    getConnectors={resolvedGetConnectors}
                    ipfsGatewayURL={ipfsGatewayURL}
                    reactQueryClient={queryClient}
                >
                    <ThemeUpdater />
                    <MultiChainLinksUpdater />
                    <App
                        kpiTokenTemplateBaseURL={kpiTokenTemplateBaseURL}
                        oracleTemplateBaseURL={oracleTemplateBaseURL}
                        templateId={templateId}
                    />
                </CarrotCoreProvider>
            </HostStateProvider>
        </HashRouter>
    );
};

if (!__PREVIEW_MODE__) {
    const container = document.getElementById("root");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(container!);
    root.render(
        <StrictMode>
            <Root />
        </StrictMode>
    );

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./sw.js")
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
