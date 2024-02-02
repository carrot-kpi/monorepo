import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createConfig, type CreateConnectorFn } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { SharedEntrypoint } from "./shared-entrypoint";
import { IPFS_GATEWAY_URL, SUPPORTED_CHAINS } from "./constants";
import { HashRouter } from "react-router-dom";
import { HostStateProvider } from "./state";
import { ReactSharedStateProvider } from "@carrot-kpi/shared-state";
import {
    useSetDevMode,
    useSetIPFSGatewayURL,
    useSetStagingMode,
} from "@carrot-kpi/react";
import { type Transport, http } from "viem";
import { readonly } from "./connectors";

console.log(`Carrot host frontend running in ${__BUILDING_MODE__} mode`);

const connectors: CreateConnectorFn[] = [
    readonly(),
    coinbaseWallet({
        appName: "Carrot",
        darkMode: true,
    }),
];

if (window.ethereum?.isFrame) {
    connectors.push(
        injected({
            target: {
                id: "frame",
                name: "Frame",
                provider() {
                    return window.ethereum;
                },
            },
        }),
    );
}

if (!!__WALLETCONNECT_PROJECT_ID__) {
    connectors.push(walletConnect({ projectId: __WALLETCONNECT_PROJECT_ID__ }));
}

const config = createConfig({
    chains: SUPPORTED_CHAINS,
    transports: SUPPORTED_CHAINS.reduce(
        (transports, chain) => {
            transports[chain.id] = http(chain.rpcUrls.default.http[0]);
            return transports;
        },
        {} as Record<number, Transport>,
    ),
    connectors,
    batch: {
        multicall: {
            wait: 100,
        },
    },
});

export const Root = () => {
    const setDevMode = useSetDevMode();
    const setStagingMode = useSetStagingMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();

    setDevMode(false);
    setStagingMode(__BUILDING_MODE__ === "staging");
    setIPFSGatewayURL(IPFS_GATEWAY_URL);

    return (
        <SharedEntrypoint
            config={config}
            enableFathom={__BUILDING_MODE__ === "production"}
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

if (__BUILDING_MODE__ === "production" && "serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .then(() => {
            console.log("Carrot service worker registered successfully");
        })
        .catch((error) => {
            console.error("Could not register Carrot service worker", error);
        });
}
