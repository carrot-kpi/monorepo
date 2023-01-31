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
        factory: "0x59429Bcc86FF13f9B66Af412Ff62dD2c9eF8e607",
        kpiTokensManager: "0x9bED1f20E296c186e287Bf3e443581e9F252aA75",
        oraclesManager: "0x839903e7829635dB2ba5E3F6355FD341F9Eec436",
    },
    [ChainId.SEPOLIA]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0xD3Fe5d463dD1fd943CCC2271F2ea980B898B5DA3",
        kpiTokensManager: "0xD6e88c910329fE3597498772eB94991a0630306d",
        oraclesManager: "0xe3dA4E4b76C4ed3e4227db20F20d1F25A4507f9b",
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
