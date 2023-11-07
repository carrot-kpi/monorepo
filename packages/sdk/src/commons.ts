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
    type CarrotContracts,
    DEPLOYMENT_ADDRESSES,
} from "@carrot-kpi/contracts";

// reexport chain id
export { ChainId } from "@carrot-kpi/contracts";

export const SUPPORTED_CHAIN_IDS = Object.values(ChainId);

export const CACHER = new Cacher("carrot-kpi-sdk");

export interface ChainAddresses extends Record<keyof CarrotContracts, Address> {
    multicall3: Address;
}

const normalizeChainAddresses = (
    contracts: CarrotContracts,
): Record<keyof CarrotContracts, Address> => {
    return Object.entries(contracts).reduce(
        (accumulator: Record<string, Address>, [name, info]) => {
            accumulator[name] = info.address;
            return accumulator;
        },
        {},
    );
};

export const CHAIN_ADDRESSES: Record<ChainId, ChainAddresses> = {
    [ChainId.GNOSIS]: {
        ...normalizeChainAddresses(DEPLOYMENT_ADDRESSES[ChainId.GNOSIS]),
        multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
    },
    [ChainId.SEPOLIA]: {
        ...normalizeChainAddresses(DEPLOYMENT_ADDRESSES[ChainId.SEPOLIA]),
        multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
    },
    [ChainId.SCROLL_SEPOLIA]: {
        ...normalizeChainAddresses(
            DEPLOYMENT_ADDRESSES[ChainId.SCROLL_SEPOLIA],
        ),
        multicall3: "0xc325890958D399ee26c26D21bBeFbDA17B03a611",
    },
    [ChainId.POLYGON_MUMBAI]: {
        ...normalizeChainAddresses(
            DEPLOYMENT_ADDRESSES[ChainId.POLYGON_MUMBAI],
        ),
        multicall3: "0xca11bde05977b3631167028862be2a173976ca11",
    },
};

export const SUBGRAPH_URL: Record<ChainId, string | null> = {
    [ChainId.GNOSIS]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-gnosis",
    [ChainId.SEPOLIA]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-sepolia",
    [ChainId.SCROLL_SEPOLIA]: null,
    [ChainId.POLYGON_MUMBAI]:
        "https://api.thegraph.com/subgraphs/name/carrot-kpi/carrot-mumbai",
};

export {
    FACTORY_ABI,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    KPI_TOKENS_MANAGER_ABI,
    ORACLES_MANAGER_ABI,
    ERC20_ABI,
};
