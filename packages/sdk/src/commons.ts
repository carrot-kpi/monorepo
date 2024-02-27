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

// reexport chain id
export { ChainId } from "@carrot-kpi/contracts";

export const CACHER = new Cacher("carrot-kpi-sdk");

export enum Environment {
    Development = "development",
    Staging = "staging",
}

export interface ServiceUrls {
    staticCdn: string;
    dataCdn: string;
    dataManager: string;
}

export const SERVICE_URLS: Record<Environment, ServiceUrls> = {
    [Environment.Development]: {
        staticCdn: "https://static.dev.carrot.community",
        dataCdn: "https://data.dev.carrot.community",
        dataManager: "https://data-manager.api.dev.carrot.community",
    },
    [Environment.Staging]: {
        staticCdn: "https://static.staging.carrot.community",
        dataCdn: "https://data.staging.carrot.community",
        dataManager: "https://data-manager.api.staging.carrot.community",
    },
};

export interface SupportedChain extends Chain {
    contracts: {
        ensRegistry?: ChainContract;
        ensUniversalResolver?: ChainContract;
        multicall3: ChainContract;
        factory: ChainContract;
        kpiTokensManager: ChainContract;
        oraclesManager: ChainContract;
    };
    environment: Environment;
    serviceUrls: ServiceUrls & { subgraph: string | null };
}

export const SUPPORTED_CHAIN: Record<ChainId, SupportedChain> = {
    [ChainId.Sepolia]: defineChain<ChainFormatters, SupportedChain>({
        ...sepolia,
        contracts: {
            ...sepolia.contracts,
            ...DEPLOYMENT_ADDRESSES[ChainId.Sepolia],
        },
        environment: Environment.Staging,
        serviceUrls: {
            ...SERVICE_URLS[Environment.Staging],
            subgraph:
                "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-sepolia",
        },
    }),
    [ChainId.ArbitrumSepolia]: defineChain<ChainFormatters, SupportedChain>({
        ...arbitrumSepolia,
        contracts: {
            ...arbitrumSepolia.contracts,
            ...DEPLOYMENT_ADDRESSES[ChainId.ArbitrumSepolia],
        },
        environment: Environment.Development,
        serviceUrls: {
            ...SERVICE_URLS[Environment.Development],
            subgraph:
                "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-arbitrum-sepolia",
        },
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
