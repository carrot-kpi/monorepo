import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import {
    darkTheme,
    lightTheme,
    RainbowKitProvider,
    getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { infuraProvider } from "wagmi/providers/infura";
import { SUPPORTED_CHAINS } from "../../constants";
import { CarrotCoreProvider } from "@carrot-kpi/react";
import { ChainId } from "@carrot-kpi/sdk";
import { App } from "../../pages/app";

const INFURA_PROJECT_ID = "0ebf4dd05d6740f482938b8a80860d13";

const supportedChainsArray = Object.values(SUPPORTED_CHAINS);

const providers = [infuraProvider({ apiKey: INFURA_PROJECT_ID })];

interface StandaloneSetupProps {
    ipfsGatewayURL?: string;
}

export const StandaloneSetup = ({ ipfsGatewayURL }: StandaloneSetupProps) => {
    const { connectors } = getDefaultWallets({
        appName: "Carrot KPI",
        chains: supportedChainsArray,
    });

    return (
        <CarrotCoreProvider
            supportedChains={supportedChainsArray}
            providers={providers}
            getConnectors={connectors}
            ipfsGatewayURL={ipfsGatewayURL}
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
                <App />
            </RainbowKitProvider>
        </CarrotCoreProvider>
    );
};
