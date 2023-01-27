import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./pages/app";
import { infuraProvider } from "wagmi/providers/infura";
import { CarrotCoreProvider } from "@carrot-kpi/react";
import { CarrotUIProvider } from "@carrot-kpi/ui";
import { ChainId } from "@carrot-kpi/sdk";
import { SUPPORTED_CHAINS } from "./constants";
import {
    darkTheme,
    getDefaultWallets,
    lightTheme,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "./i18n";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@carrot-kpi/ui/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import "./global.css";

const INFURA_PROJECT_ID = "0ebf4dd05d6740f482938b8a80860d13";

const supportedChainsArray = Object.values(SUPPORTED_CHAINS);

const { connectors } = getDefaultWallets({
    appName: "Carrot KPI",
    chains: supportedChainsArray,
});

__webpack_init_sharing__("default");

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
    <StrictMode>
        <HashRouter>
            <CarrotCoreProvider
                supportedChains={supportedChainsArray}
                providers={[infuraProvider({ apiKey: INFURA_PROJECT_ID })]}
                getConnectors={connectors}
            >
                <RainbowKitProvider
                    chains={supportedChainsArray}
                    // TODO: make this so initial chain is either the one the user had previously
                    // chosen (through local storage) or mainnet or a more sensible option
                    initialChain={ChainId.SEPOLIA}
                    theme={{
                        lightMode: lightTheme(),
                        darkMode: darkTheme(),
                    }}
                >
                    <CarrotUIProvider>
                        <App />
                    </CarrotUIProvider>
                </RainbowKitProvider>
            </CarrotCoreProvider>
        </HashRouter>
    </StrictMode>
);

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    navigator.serviceWorker
        .register(`/sw.js`)
        .then(() => {
            console.log("carrot service worker registered successfully");
        })
        .catch((error) => {
            console.error("could not register carrot service worker", error);
        });
}
