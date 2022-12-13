import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./pages/app";
import { chain as wagmiChain, Chain } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CarrotCoreProvider } from "@carrot-kpi/react";
import { CarrotUIProvider } from "@carrot-kpi/ui";
import "./i18n";
import "./global.css";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

const INFURA_PROJECT_ID = "0ebf4dd05d6740f482938b8a80860d13";

// FIXME: uncomment when Goerli works
// const supportedChains = Object.values(wagmiChain).filter((chain) => {
//   return chain.id in ChainId
// })

const getConnectors = (chains: Chain[]) => [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
        chains,
        options: {
            qrcode: true,
        },
    }),
];

__webpack_init_sharing__("default");

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
    <StrictMode>
        <HashRouter>
            <CarrotCoreProvider
                supportedChains={[wagmiChain.sepolia]}
                providers={[infuraProvider({ apiKey: INFURA_PROJECT_ID })]}
                getConnectors={getConnectors}
            >
                <CarrotUIProvider>
                    <App />
                </CarrotUIProvider>
            </CarrotCoreProvider>
        </HashRouter>
    </StrictMode>
);
