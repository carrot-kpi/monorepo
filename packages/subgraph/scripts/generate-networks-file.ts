#!/usr/bin/env ts-node

import { writeFileSync } from "fs";
import { resolve } from "path";
import { DEPLOYMENT_ADDRESSES, ChainId } from "@carrot-kpi/contracts";

interface ChainConfig {
    Factory: {
        address: string;
        startBlock: number;
    };
    KPITokensManager: {
        address: string;
        startBlock: number;
    };
    OraclesManager: {
        address: string;
        startBlock: number;
    };
}

const NETWORK_NAMES: Record<ChainId, string> = {
    [ChainId.GNOSIS]: "gnosis",
    [ChainId.SCROLL_SEPOLIA]: "scroll-sepolia",
    [ChainId.SEPOLIA]: "sepolia",
};

const networks = Object.entries(DEPLOYMENT_ADDRESSES).reduce(
    (accumulator, [chain, contracts]) => {
        accumulator[NETWORK_NAMES[Number(chain) as ChainId]] = {
            Factory: {
                address: contracts.factory.address,
                startBlock: contracts.factory.deploymentBlock,
            },
            KPITokensManager: {
                address: contracts.kpiTokensManager.address,
                startBlock: contracts.kpiTokensManager.deploymentBlock,
            },
            OraclesManager: {
                address: contracts.oraclesManager.address,
                startBlock: contracts.oraclesManager.deploymentBlock,
            },
        };
        return accumulator;
    },
    {} as Record<string, ChainConfig>,
);

try {
    writeFileSync(resolve("networks.json"), JSON.stringify(networks, null, 4));
    console.log("networks json file successfully generated");
} catch (error) {
    console.error("error while generating networks json file", error);
}
