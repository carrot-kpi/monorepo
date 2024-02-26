import { ChainId } from "@carrot-kpi/contracts";
import type { PublicClient, Transport } from "viem";
import { enforce } from "./invariant";
import type { SupportedChain } from "../commons";

export const validateChainId = async (
    publicClient: PublicClient<Transport, SupportedChain | undefined>,
): Promise<SupportedChain> => {
    const { chain } = publicClient;
    enforce(!!chain, `no chain provided with public client`);
    enforce(chain.id in ChainId, `unsupported chain with id ${chain.id}`);
    return chain;
};
