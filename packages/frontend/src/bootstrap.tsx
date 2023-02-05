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
import { StandaloneSetup } from "./components/standalone-setup";
import { PreviewSetup } from "./components/preview-setup";

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
                {__PREVIEW_MODE__ ? (
                    <PreviewSetup
                        supportedChains={supportedChains}
                        providers={providers}
                        connectors={connectors}
                        ipfsGatewayURL={ipfsGatewayURL}
                        customBaseURL={customBaseURL}
                        templateId={templateId}
                    />
                ) : (
                    <StandaloneSetup />
                )}
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
