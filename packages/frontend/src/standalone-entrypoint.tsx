import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createConfig, type CreateConnectorFn } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { SharedEntrypoint } from "./shared-entrypoint";
import {
    IPFS_GATEWAY_URL,
    SUPPORTED_CHAIN_TRANSPORT,
    SUPPORTED_CHAINS,
} from "./constants";
import { HostStateProvider } from "./state";
import {
    Environment,
    ReactSharedStateProvider,
} from "@carrot-kpi/shared-state";
import {
    useSetEnvironment,
    useSetIPFSGatewayURL,
    useSetTemplatePreviewMode,
} from "@carrot-kpi/react";
import { readonly } from "./connectors";

console.log(`Carrot host frontend running in ${__ENVIRONMENT__} environment`);

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

if (window.ethereum?.isMetaMask)
    connectors.push(injected({ target: "metaMask" }));

if (!!__WALLETCONNECT_PROJECT_ID__)
    connectors.push(walletConnect({ projectId: __WALLETCONNECT_PROJECT_ID__ }));

export const config = createConfig({
    chains: SUPPORTED_CHAINS,
    transports: SUPPORTED_CHAIN_TRANSPORT,
    connectors,
    batch: {
        multicall: {
            wait: 100,
        },
    },
});

export const Root = () => {
    const setEnvironment = useSetEnvironment();
    const setTemplatePreviewMode = useSetTemplatePreviewMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();

    setEnvironment(__ENVIRONMENT__);
    setTemplatePreviewMode(true);
    setIPFSGatewayURL(IPFS_GATEWAY_URL);

    return (
        <SharedEntrypoint
            config={config}
            // FIXME: enable this in production
            enableFathom={false}
        />
    );
};

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
    <StrictMode>
        <HostStateProvider>
            <ReactSharedStateProvider>
                <Root />
            </ReactSharedStateProvider>
        </HostStateProvider>
    </StrictMode>,
);

if (
    __ENVIRONMENT__ !== Environment.Production &&
    "serviceWorker" in navigator
) {
    navigator.serviceWorker
        .register("./sw.js")
        .then(() => {
            console.log("Carrot service worker registered successfully");
        })
        .catch((error) => {
            console.error("Could not register Carrot service worker", error);
        });
}
