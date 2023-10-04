import { ChainId } from "@carrot-kpi/contracts";
import type { PublicClient } from "viem";
import { enforce } from "./invariant";

export const validateChainId = async (
    publicClient: PublicClient,
): Promise<ChainId> => {
    const id = publicClient.chain?.id || (await publicClient.getChainId());
    enforce(id in ChainId, `unsupported chain with id ${id}`);
    return id;
};
