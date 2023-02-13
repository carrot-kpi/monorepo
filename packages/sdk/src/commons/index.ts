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
        factory: "0x8d98758EfF88Dc944035B0618a8412C400E71C72",
        kpiTokensManager: "0x2043D9aa54e333c52dB22a8AFbFCbdcE35958f42",
        oraclesManager: "0x22d8655b405F6a8D6Bb7c5838AaF187a32158B07",
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
