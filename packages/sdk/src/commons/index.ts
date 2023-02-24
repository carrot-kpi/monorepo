import FACTORY_ABI from "../abis/factory";
import KPI_TOKEN_ABI from "../abis/kpi-token";
import ORACLE_ABI from "../abis/oracle";
import KPI_TOKENS_MANAGER_ABI from "../abis/kpi-tokens-manager";
import ORACLES_MANAGER_ABI from "../abis/oracles-manager";
import MULTICALL_ABI from "../abis/multicall";
import ERC20_ABI from "../abis/erc20";
import { Cacher } from "../cacher";

export enum ChainId {
    GOERLI = 5,
    SEPOLIA = 11155111,
}

export const CACHER = new Cacher("carrot-sdk");

export interface ChainAddresses {
    multicall: string;
    factory: string;
    kpiTokensManager: string;
    oraclesManager: string;
}

export const CHAIN_ADDRESSES: Record<ChainId, ChainAddresses> = {
    [ChainId.GOERLI]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x9fa71dF5AEa30B488839984EDC8efe57DBc3e8C7",
        kpiTokensManager: "0xB7B626f643AeDCCD39112A30E4A95c16bA3d05C7",
        oraclesManager: "0xC3afEab48E0A7f2C3809f8Dd9674E526B11754cd",
    },
    [ChainId.SEPOLIA]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x32E0Cea8167B0E5b64196D10352A486Ca4BcedcD",
        kpiTokensManager: "0x766faa004398d68Ef7f64926525E7ad2933A0f87",
        oraclesManager: "0xdFFdC76D71971B4c55de059b00F38dDe3d7b49cB",
    },
};

export const SUBGRAPH_URL: Record<ChainId, string | null> = {
    [ChainId.GOERLI]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-kpi-goerli",
    [ChainId.SEPOLIA]: null,
};

export {
    FACTORY_ABI,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    KPI_TOKENS_MANAGER_ABI,
    ORACLES_MANAGER_ABI,
    MULTICALL_ABI,
    ERC20_ABI,
};
