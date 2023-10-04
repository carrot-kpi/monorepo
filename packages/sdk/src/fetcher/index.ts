import type { Address, PublicClient } from "viem";
import { KPIToken } from "../entities/kpi-token";
import { Template } from "../entities/template";
import { Oracle } from "../entities/oracle";
import type {
    FetchERC20TokensParams,
    FullFetcherFetchKPITokenAddressesParams,
    FullFetcherFetchKPITokensAmountParams,
    FullFetcherFetchKPITokensParams,
    FullFetcherFetchLatestKPITokenAddressesParams,
    FullFetcherFetchOraclesParams,
    FullFetcherFetchTemplatesParams,
    IFullCarrotFetcher,
} from "./abstraction";
import { OnChainFetcher } from "./on-chain";
import { SubgraphFetcher } from "./subgraph";
import { CoreFetcher } from "./core";
import { Token } from "../entities/token";
import { validateChainId } from "../utils";

export * from "./types";
export * from "./abstraction";

class FullFetcher extends CoreFetcher implements IFullCarrotFetcher {
    private async shouldUseSubgraph({
        publicClient,
        preferDecentralization,
    }: {
        publicClient: PublicClient;
        preferDecentralization?: boolean;
    }) {
        if (preferDecentralization) return false;
        const chainId = await validateChainId(publicClient);
        return SubgraphFetcher.supportedInChain({ chainId });
    }

    public async fetchERC20Tokens({
        publicClient,
        addresses,
    }: FetchERC20TokensParams): Promise<{ [address: string]: Token }> {
        if (!addresses || addresses.length === 0) return {};
        return super.fetchERC20Tokens({ publicClient, addresses });
    }

    public async fetchKPITokensAmount({
        publicClient,
        preferDecentralization,
    }: FullFetcherFetchKPITokensAmountParams): Promise<number> {
        const useSubgraph = await this.shouldUseSubgraph({
            publicClient,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokensAmount({ publicClient })
            : OnChainFetcher.fetchKPITokensAmount({ publicClient });
    }

    public async fetchKPITokenAddresses({
        publicClient,
        preferDecentralization,
        blacklisted,
        fromIndex,
        toIndex,
    }: FullFetcherFetchKPITokenAddressesParams): Promise<Address[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            publicClient,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokenAddresses({
                  publicClient,
                  blacklisted,
                  fromIndex,
                  toIndex,
              })
            : OnChainFetcher.fetchKPITokenAddresses({
                  publicClient,
                  blacklisted,
                  fromIndex,
                  toIndex,
              });
    }

    public async fetchLatestKPITokenAddresses({
        publicClient,
        preferDecentralization,
        blacklisted,
        limit: count,
    }: FullFetcherFetchLatestKPITokenAddressesParams): Promise<Address[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            publicClient,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchLatestKPITokenAddresses({
                  publicClient,
                  blacklisted,
                  limit: count,
              })
            : OnChainFetcher.fetchLatestKPITokenAddresses({
                  publicClient,
                  blacklisted,
                  limit: count,
              });
    }

    async fetchKPITokens({
        publicClient,
        preferDecentralization,
        blacklisted,
        addresses,
    }: FullFetcherFetchKPITokensParams): Promise<{
        [address: string]: KPIToken;
    }> {
        const useSubgraph = await this.shouldUseSubgraph({
            publicClient,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokens({
                  publicClient,
                  blacklisted,
                  addresses,
              })
            : OnChainFetcher.fetchKPITokens({
                  publicClient,
                  blacklisted,
                  addresses,
              });
    }

    async fetchOracles({
        publicClient,
        preferDecentralization,
        addresses,
    }: FullFetcherFetchOraclesParams): Promise<{ [address: string]: Oracle }> {
        const useSubgraph = await this.shouldUseSubgraph({
            publicClient,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchOracles({
                  publicClient,
                  addresses,
              })
            : OnChainFetcher.fetchOracles({
                  publicClient,
                  addresses,
              });
    }

    async fetchKPITokenTemplates({
        publicClient,
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            publicClient,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokenTemplates({
                  publicClient,
                  ids,
              })
            : OnChainFetcher.fetchKPITokenTemplates({
                  publicClient,
                  ids,
              });
    }

    async fetchOracleTemplates({
        publicClient,
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            publicClient,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchOracleTemplates({
                  publicClient,
                  ids,
              })
            : OnChainFetcher.fetchOracleTemplates({
                  publicClient,
                  ids,
              });
    }
}

export const Fetcher = new FullFetcher();
