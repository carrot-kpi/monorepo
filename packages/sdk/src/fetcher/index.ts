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
import { BaseFetcher } from "./base";

export * from "./abstraction";
export * from "./core";

class FullFetcher extends BaseFetcher implements IFullCarrotFetcher {
    subgraphFetcher;
    onChainFetcher;

    constructor(provider: Provider, ipfsGatewayURL: string) {
        super(provider, ipfsGatewayURL);
        this.subgraphFetcher = SubgraphFetcher(
            this.provider,
            this.ipfsGatewayURL
        );
        this.onChainFetcher = OnChainFetcher(
            this.provider,
            this.ipfsGatewayURL
        );
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
                  addresses,
                  searchQuery,
              })
            : this.onChainFetcher.fetchKPITokens({
                  addresses,
              });
    }

    async fetchOracles({
        preferDecentralization,
        addresses,
    }: FullFetcherFetchEntitiesParams): Promise<{ [address: string]: Oracle }> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchOracles({
                  addresses,
              })
            : this.onChainFetcher.fetchOracles({
                  addresses,
              });
    }

    async fetchKPITokenTemplates({
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchKPITokenTemplates({
                  ids,
              })
            : this.onChainFetcher.fetchKPITokenTemplates({
                  ids,
              });
    }

    async fetchOracleTemplates({
        preferDecentralization,
        ids,
    }: FullFetcherFetchTemplatesParams): Promise<Template[]> {
        const useSubgraph = await this.shouldUseSubgraph({
            preferDecentralization,
        });
        return useSubgraph
            ? this.subgraphFetcher.fetchOracleTemplates({
                  ids,
              })
            : this.onChainFetcher.fetchOracleTemplates({
                  ids,
              });
    }
}

export const Fetcher = (provider: Provider, ipfsGatewayURL: string) =>
    new FullFetcher(provider, ipfsGatewayURL);
