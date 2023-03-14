import FACTORY_ABI from "../abis/factory";
import KPI_TOKEN_ABI from "../abis/kpi-token";
import ORACLE_ABI from "../abis/oracle";
import KPI_TOKENS_MANAGER_ABI from "../abis/kpi-tokens-manager";
import ORACLES_MANAGER_ABI from "../abis/oracles-manager";
import MULTICALL_ABI from "../abis/multicall";
import ERC20_ABI from "../abis/erc20";
import { Cacher } from "../cacher";

export enum ChainId {
    GNOSIS = 100,
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
    [ChainId.GNOSIS]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x0D92C8a527C8b1959Eb2112466148d262685b866",
        kpiTokensManager: "0xC29d8922baA9618D63B757Ec2E266c2C9402E2A8",
        oraclesManager: "0x44445F80e99C45b3ca8a6c208a993B31F342b01e",
    },
    [ChainId.SEPOLIA]: {
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        factory: "0x32E0Cea8167B0E5b64196D10352A486Ca4BcedcD",
        kpiTokensManager: "0x766faa004398d68Ef7f64926525E7ad2933A0f87",
        oraclesManager: "0xdFFdC76D71971B4c55de059b00F38dDe3d7b49cB",
    },
};

export const SUBGRAPH_URL: Record<ChainId, string | null> = {
    [ChainId.GNOSIS]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-kpi-gnosis",
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
