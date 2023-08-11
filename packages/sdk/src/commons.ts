import FACTORY_ABI from "./abis/factory";
import KPI_TOKEN_ABI from "./abis/kpi-token";
import ORACLE_ABI from "./abis/oracle";
import KPI_TOKENS_MANAGER_ABI from "./abis/kpi-tokens-manager";
import ORACLES_MANAGER_ABI from "./abis/oracles-manager";
import ERC20_ABI from "./abis/erc20";
import { Cacher } from "./cacher";
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
        factory: "0xD503Bdcc3Cd38D3cEaBa1efA43EFCc03b7Fb1CbA",
        kpiTokensManager: "0xCd85e0690f85A52D260273E5B51336D1151F2832",
        oraclesManager: "0xc9E426B468d334AF6208ef9b3bA5f599d1417c6e",
    },
    [ChainId.SEPOLIA]: {
        multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x44bBb970E534bCE4B42C5a34b15d5B049704417A",
        kpiTokensManager: "0xA4537024597F8B9243AbE105D0Cb297Ea2562ef1",
        oraclesManager: "0x940d1D2F5c5724a37593D323bFde54F81D6f11C0",
    },
    [ChainId.SCROLL_TESTNET]: {
        multicall3: "0xc325890958D399ee26c26D21bBeFbDA17B03a611",
        factory: "0xDDD3e99f11488290Ff07BAe128Bd6D23362f2455",
        kpiTokensManager: "0xe0D8CcAa64e8C88DD97f442109d591A7e4F57244",
        oraclesManager: "0x8d98758EfF88Dc944035B0618a8412C400E71C72",
    },
};

export const SUBGRAPH_URL: Record<ChainId, string | null> = {
    [ChainId.GNOSIS]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-kpi-gnosis",
    [ChainId.SEPOLIA]: null,
    [ChainId.SCROLL_TESTNET]: null,
};

export const FEATURED_BLACKLISTED_KPI_TOKENS_CONFIGURATION_LOCATION =
    "https://static.carrot-kpi.dev/featured-blacklisted-kpi-tokens.json";

export {
    FACTORY_ABI,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    KPI_TOKENS_MANAGER_ABI,
    ORACLES_MANAGER_ABI,
    ERC20_ABI,
};
