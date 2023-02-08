import { Provider } from "@ethersproject/providers";
import { KPIToken } from "../entities/kpi-token";
import { Template } from "../entities/template";
import { Oracle } from "../entities/oracle";
import {
    FetchERC20TokensParams,
    FullFetcherFetchEntityParams,
    FullFetcherFetchTemplatesParams,
    IFullCarrotFetcher,
} from "./abstraction";
import { OnChainFetcher } from "./on-chain";
import { SubgraphFetcher } from "./subgraph";
import { CoreFetcher } from "./core";
import { Token } from "../entities/token";

class FullFetcher implements IFullCarrotFetcher {
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

    async fetchERC20Tokens({
        provider,
        addresses,
    }: FetchERC20TokensParams): Promise<{ [address: string]: Token }> {
        if (!addresses || addresses.length === 0) return {};
        return CoreFetcher.fetchERC20Tokens({ provider, addresses });
    }

    async fetchKPITokens({
        provider,
        preferDecentralization,
        addresses,
    }: FullFetcherFetchEntityParams): Promise<{ [address: string]: KPIToken }> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchKPITokens({ provider, addresses })
            : OnChainFetcher.fetchKPITokens({ provider, addresses });
    }

    async fetchOracles({
        provider,
        preferDecentralization,
        addresses,
    }: FullFetcherFetchEntityParams): Promise<{ [address: string]: Oracle }> {
        const useSubgraph = await this.shouldUseSubgraph({
            provider,
            preferDecentralization,
        });
        return useSubgraph
            ? SubgraphFetcher.fetchOracles({ provider, addresses })
            : OnChainFetcher.fetchOracles({ provider, addresses });
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
            ? SubgraphFetcher.fetchKPITokenTemplates({ provider, ids })
            : OnChainFetcher.fetchKPITokenTemplates({ provider, ids });
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
            ? SubgraphFetcher.fetchOracleTemplates({ provider, ids })
            : OnChainFetcher.fetchOracleTemplates({ provider, ids });
    }
}

export const Fetcher = new FullFetcher();
