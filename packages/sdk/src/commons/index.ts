import FACTORY_ABI from "../abis/factory";
import KPI_TOKEN_ABI from "../abis/kpi-token";
import ORACLE_ABI from "../abis/oracle";
import KPI_TOKENS_MANAGER_ABI from "../abis/kpi-tokens-manager";
import ORACLES_MANAGER_ABI from "../abis/oracles-manager";
import MULTICALL_ABI from "../abis/multicall";
import ERC20_ABI from "../abis/erc20";
import { Cacher } from "../cacher";
import { type Address } from "viem";

export enum ChainId {
    GNOSIS = 100,
    SEPOLIA = 11155111,
    ARBITRUM_GOERLI = 421613,
}

export const CACHER = new Cacher("carrot-kpi-sdk");

export interface ChainAddresses {
    multicall: Address;
    factory: Address;
    kpiTokensManager: Address;
    oraclesManager: Address;
}

export const CHAIN_ADDRESSES: Record<ChainId, ChainAddresses> = {
    [ChainId.GNOSIS]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x8F140C6473ab59adCe2a294EdE8d6aB485CfCb8c",
        kpiTokensManager: "0x613e4da8b515D11908b1024189564674CA376615",
        oraclesManager: "0x61FBb8D6Eb96482a89B6b3aE7af4c391f8A86cB3",
    },
    [ChainId.SEPOLIA]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x711524b033FBB213CA71e3d4e09b4792A2299FEF",
        kpiTokensManager: "0x6e787295f8FC487776DE28A4f8a7a21fBd341069",
        oraclesManager: "0xB65Bd5941e8bF11d7F0eF098BFd08CDD30841797",
    },
    [ChainId.ARBITRUM_GOERLI]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0xB6044f769f519a634A5150645484b18d0C031ae8",
        kpiTokensManager: "0xe37AA274d1bb3815b63cd13064dE443423F74316",
        oraclesManager: "0xEc0B101CDC03ae65F78cF5477F2b9e0FaB9f2b28",
    },
};

export const SUBGRAPH_URL: Record<ChainId, string | null> = {
    [ChainId.GNOSIS]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-kpi-gnosis",
    [ChainId.SEPOLIA]: null,
    [ChainId.ARBITRUM_GOERLI]: null,
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
