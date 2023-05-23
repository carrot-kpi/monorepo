import FACTORY_ABI from "../abis/factory";
import KPI_TOKEN_ABI from "../abis/kpi-token";
import ORACLE_ABI from "../abis/oracle";
import KPI_TOKENS_MANAGER_ABI from "../abis/kpi-tokens-manager";
import ORACLES_MANAGER_ABI from "../abis/oracles-manager";
import ERC20_ABI from "../abis/erc20";
import { Cacher } from "../cacher";
import { type Address } from "viem";

export enum ChainId {
    GNOSIS = 100,
    SEPOLIA = 11155111,
    SCROLL_TESTNET = 534353,
}

export const CACHER = new Cacher("carrot-kpi-sdk");

export interface ChainAddresses {
    multicall3: Address;
    factory: Address;
    kpiTokensManager: Address;
    oraclesManager: Address;
}

export const CHAIN_ADDRESSES: Record<ChainId, ChainAddresses> = {
    [ChainId.GNOSIS]: {
        multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x2C9c7E6d05a98f771C22819C80D70827d2d9eBAF",
        kpiTokensManager: "0xfE0CFcbCb1746054c342aC975278CFb5D6afa33F",
        oraclesManager: "0x928d003c0D4e75fb08F4A90E46963c34514E6C42",
    },
    [ChainId.SEPOLIA]: {
        multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x38A9B2a80332e9eAA42b6e69Cb829c6264225DCf",
        kpiTokensManager: "0x07e6527504Fc12b810F30b510D4A900D26a116bE",
        oraclesManager: "0x75eA380734e44f761c55bb428AB33Ed793544F14",
    },
    [ChainId.SCROLL_TESTNET]: {
        multicall3: "0xc325890958D399ee26c26D21bBeFbDA17B03a611",
        factory: "0x64a0745EF9d3772d9739D9350873eD3703bE45eC",
        kpiTokensManager: "0xD4AC4AaFb81eC774E49AA755A66EfCe4574D6276",
        oraclesManager: "0xD3Fe5d463dD1fd943CCC2271F2ea980B898B5DA3",
    },
};

export const SUBGRAPH_URL: Record<ChainId, string | null> = {
    [ChainId.GNOSIS]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-kpi-gnosis",
    [ChainId.SEPOLIA]: null,
    [ChainId.SCROLL_TESTNET]: null,
};

export {
    FACTORY_ABI,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    KPI_TOKENS_MANAGER_ABI,
    ORACLES_MANAGER_ABI,
    ERC20_ABI,
};
