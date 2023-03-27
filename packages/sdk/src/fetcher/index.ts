import { Provider } from "@ethersproject/providers";
import { KPIToken } from "../entities/kpi-token";
import { Template } from "../entities/template";
import { Oracle } from "../entities/oracle";
import {
    FetchERC20TokensParams,
    FullFetcherFetchEntitiesParams,
    FullFetcherFetchKPITokenAddressesParams,
    FullFetcherFetchKPITokensAmountParams,
    FullFetcherFetchTemplatesParams,
    IFullCarrotFetcher,
} from "./abstraction";
import { OnChainFetcher } from "./on-chain";
import { SubgraphFetcher } from "./subgraph";
import { CoreFetcher } from "./core";
import { Token } from "../entities/token";

export * from "./abstraction";

class FullFetcher extends CoreFetcher implements IFullCarrotFetcher {
    private async shouldUseSubgraph({
        provider,
        preferDecentralization,
    }: {
        provider: Provider;
        preferDecentralization?: boolean;
    }) {
        if (preferDecentralization) return false;
        const { chainId } = await provider.getNetwork();
        return SubgraphFetcher.supportedInChain({ chainId });
    }

    public async fetchERC20Tokens({
        provider,
        addresses,
    }: FetchERC20TokensParams): Promise<{ [address: string]: Token }> {
        if (!addresses || addresses.length === 0) return {};
        return this.fetchERC20Tokens({ provider, addresses });
    }

    public async fetchKPITokensAmount({
        provider,
        preferDecentralization,
    }: FullFetcherFetchKPITokensAmountParams): Promise<number> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokensAmount({ provider })
            : OnChainFetcher.fetchKPITokensAmount({ provider });
    }

    public async fetchKPITokenAddresses({
        provider,
        preferDecentralization,
        fromIndex,
        toIndex,
    }: FullFetcherFetchKPITokenAddressesParams): Promise<string[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokenAddresses({
                  provider,
                  fromIndex,
                  toIndex,
              })
            : OnChainFetcher.fetchKPITokenAddresses({
                  provider,
                  fromIndex,
                  toIndex,
              });
    }

    async fetchKPITokens({
        provider,
        preferDecentralization,
        addresses,
    }: FullFetcherFetchEntitiesParams): Promise<{
        [address: string]: KPIToken;
    }> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokens({
                  provider,
                  addresses,
              })
            : OnChainFetcher.fetchKPITokens({
                  provider,
                  addresses,
              });
    }

    async fetchOracles({
        provider,
        preferDecentralization,
        addresses,
    }: FullFetcherFetchEntitiesParams): Promise<{ [address: string]: Oracle }> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchOracles({
                  provider,
                  addresses,
              })
            : OnChainFetcher.fetchOracles({
                  provider,
                  addresses,
              });
    }

    async fetchKPITokenTemplates({
        provider,
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokenTemplates({
                  provider,
                  ids,
              })
            : OnChainFetcher.fetchKPITokenTemplates({
                  provider,
                  ids,
              });
    }

    async fetchOracleTemplates({
        provider,
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchOracleTemplates({
                  provider,
                  ids,
              })
            : OnChainFetcher.fetchOracleTemplates({
                  provider,
                  ids,
              });
    }
}

export const Fetcher = new FullFetcher();
