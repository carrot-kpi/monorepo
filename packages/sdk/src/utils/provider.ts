import { ChainId } from "@carrot-kpi/contracts";
import type { PublicClient } from "viem";
import { enforce } from "./invariant";
import { SUPPORTED_CHAIN_IDS } from "../commons";

export const validateChainId = async (
    publicClient: PublicClient,
): Promise<ChainId> => {
    const id = publicClient.chain?.id || (await publicClient.getChainId());
    enforce(
        SUPPORTED_CHAIN_IDS.includes(id),
        `unsupported chain with id ${id}`,
    );
    return id;
};
