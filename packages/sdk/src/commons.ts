import FACTORY_ABI from "./abis/factory";
import KPI_TOKEN_ABI from "./abis/kpi-token";
import ORACLE_ABI from "./abis/oracle";
import KPI_TOKENS_MANAGER_ABI from "./abis/kpi-tokens-manager";
import ORACLES_MANAGER_ABI from "./abis/oracles-manager";
import ERC20_ABI from "./abis/erc20";
import { Cacher } from "./cacher";
import {
    type Chain,
    defineChain,
    type ChainFormatters,
    type ChainContract,
} from "viem";
import { sepolia, arbitrumSepolia } from "viem/chains";
import { ChainId, DEPLOYMENT_ADDRESSES } from "@carrot-kpi/contracts";
import { Environment } from "@carrot-kpi/shared-state";

// reexport chain id
export { ChainId } from "@carrot-kpi/contracts";

export const CACHER = new Cacher("carrot-kpi-sdk");

export interface ServiceUrls {
    dataManager: string;
}

export const SERVICE_URLS: Record<Environment, ServiceUrls> = {
    [Environment.Local]: {
        dataManager: "https://data-manager.api.dev.carrot.community",
    },
    [Environment.Development]: {
        dataManager: "https://data-manager.api.dev.carrot.community",
    },
    [Environment.Staging]: {
        dataManager: "https://data-manager.api.staging.carrot.community",
    },
    [Environment.Production]: {
        dataManager: "https://data-manager.api.carrot.community",
    },
};

export const DATA_CDN_URL = "https://data.carrot.community";

export interface SupportedChain extends Chain {
    contracts: {
        ensRegistry?: ChainContract;
        ensUniversalResolver?: ChainContract;
        multicall3: ChainContract;
        factory: ChainContract;
        kpiTokensManager: ChainContract;
        oraclesManager: ChainContract;
    };
    subgraphUrl?: string;
}

export const SUPPORTED_CHAIN: Record<ChainId, SupportedChain> = {
    [ChainId.Sepolia]: defineChain<ChainFormatters, SupportedChain>({
        ...sepolia,
        contracts: {
            ...sepolia.contracts,
            ...DEPLOYMENT_ADDRESSES[ChainId.Sepolia],
        },
        subgraphUrl:
            "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-sepolia",
    }),
    [ChainId.ArbitrumSepolia]: defineChain<ChainFormatters, SupportedChain>({
        ...arbitrumSepolia,
        contracts: {
            ...arbitrumSepolia.contracts,
            ...DEPLOYMENT_ADDRESSES[ChainId.ArbitrumSepolia],
        },
        subgraphUrl:
            "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-arbtirum-sepolia",
    }),
};

export {
    FACTORY_ABI,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    KPI_TOKENS_MANAGER_ABI,
    ORACLES_MANAGER_ABI,
    ERC20_ABI,
};
