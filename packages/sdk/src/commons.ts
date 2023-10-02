import FACTORY_ABI from "./abis/factory";
import KPI_TOKEN_ABI from "./abis/kpi-token";
import ORACLE_ABI from "./abis/oracle";
import KPI_TOKENS_MANAGER_ABI from "./abis/kpi-tokens-manager";
import ORACLES_MANAGER_ABI from "./abis/oracles-manager";
import ERC20_ABI from "./abis/erc20";
import { Cacher } from "./cacher";
import { type Address } from "viem";
import {
    ChainId,
    type CarrotContractAddresses,
    DEPLOYMENT_ADDRESSES,
} from "@carrot-kpi/contracts";

// reexport chain id
export { ChainId } from "@carrot-kpi/contracts";

export const CACHER = new Cacher("carrot-kpi-sdk");

export interface ChainAddresses extends CarrotContractAddresses {
    multicall3: Address;
}

export const CHAIN_ADDRESSES: Record<ChainId, ChainAddresses> = {
    [ChainId.GNOSIS]: {
        ...DEPLOYMENT_ADDRESSES[ChainId.GNOSIS],
        multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
    },
    [ChainId.SEPOLIA]: {
        ...DEPLOYMENT_ADDRESSES[ChainId.SEPOLIA],
        multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
    },
    [ChainId.SCROLL_SEPOLIA]: {
        ...DEPLOYMENT_ADDRESSES[ChainId.SCROLL_SEPOLIA],
        multicall3: "0xc325890958D399ee26c26D21bBeFbDA17B03a611",
    },
};

export const SUBGRAPH_URL: Record<ChainId, string | null> = {
    [ChainId.GNOSIS]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-kpi-gnosis",
    [ChainId.SEPOLIA]: null,
    [ChainId.SCROLL_SEPOLIA]: null,
};

export {
    FACTORY_ABI,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    KPI_TOKENS_MANAGER_ABI,
    ORACLES_MANAGER_ABI,
    ERC20_ABI,
};
