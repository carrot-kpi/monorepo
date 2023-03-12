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
export * from "./core";

class FullFetcher implements IFullCarrotFetcher {
    provider;
    subgraphFetcher;
    onChainFetcher;

    constructor(provider: Provider) {
        this.provider = provider;
        this.subgraphFetcher = SubgraphFetcher(this.provider);
        this.onChainFetcher = OnChainFetcher(this.provider);
    }
    private async shouldUseSubgraph({
        preferDecentralization,
    }: {
        preferDecentralization?: boolean;
    }) {
        if (preferDecentralization) return false;
        const { chainId } = await this.provider.getNetwork();
        return this.subgraphFetcher.supportedInChain({ chainId });
    }

    public async fetchERC20Tokens({
        addresses,
    }: FetchERC20TokensParams): Promise<{ [address: string]: Token }> {
        if (!addresses || addresses.length === 0) return {};
        return CoreFetcher(this.provider).fetchERC20Tokens({ addresses });
    }

    public async fetchKPITokensAmount({
        preferDecentralization,
    }: FullFetcherFetchKPITokensAmountParams): Promise<number> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchKPITokensAmount()
            : this.onChainFetcher.fetchKPITokensAmount();
    }

    public async fetchKPITokenAddresses({
        preferDecentralization,
        fromIndex,
        toIndex,
    }: FullFetcherFetchKPITokenAddressesParams): Promise<string[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchKPITokenAddresses({
                  fromIndex,
                  toIndex,
              })
            : this.onChainFetcher.fetchKPITokenAddresses({
                  fromIndex,
                  toIndex,
              });
    }

    async fetchKPITokens({
        ipfsGatewayURL,
        preferDecentralization,
        addresses,
        searchQuery,
    }: FullFetcherFetchEntitiesParams): Promise<{
        [address: string]: KPIToken;
    }> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchKPITokens({
                  ipfsGatewayURL,
                  addresses,
                  searchQuery,
              })
            : this.onChainFetcher.fetchKPITokens({
                  ipfsGatewayURL,
                  addresses,
              });
    }

    async fetchOracles({
        ipfsGatewayURL,
        preferDecentralization,
        addresses,
    }: FullFetcherFetchEntitiesParams): Promise<{ [address: string]: Oracle }> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchOracles({
                  ipfsGatewayURL,
                  addresses,
              })
            : this.onChainFetcher.fetchOracles({
                  ipfsGatewayURL,
                  addresses,
              });
    }

    async fetchKPITokenTemplates({
        ipfsGatewayURL,
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchKPITokenTemplates({
                  ipfsGatewayURL,
                  ids,
              })
            : this.onChainFetcher.fetchKPITokenTemplates({
                  ipfsGatewayURL,
                  ids,
              });
    }

    async fetchOracleTemplates({
        ipfsGatewayURL,
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchOracleTemplates({
                  ipfsGatewayURL,
                  ids,
              })
            : this.onChainFetcher.fetchOracleTemplates({
                  ipfsGatewayURL,
                  ids,
              });
    }
}

export const Fetcher = (provider: Provider) => new FullFetcher(provider);
