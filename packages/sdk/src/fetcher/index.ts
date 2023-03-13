import { KPIToken } from "../entities/kpi-token";
import { Template } from "../entities/template";
import { Oracle } from "../entities/oracle";
import {
    FetchERC20TokensParams,
    FetchEntitiesParams,
    FetchKPITokenAddressesParams,
    FetchTemplatesParams,
    IFullCarrotFetcher,
    IPartialCarrotFetcher,
} from "./abstraction";
import { OnChainFetcher } from "./on-chain";
import { SubgraphFetcher } from "./subgraph";
import { CoreFetcher } from "./core";
import { Token } from "../entities/token";
import { BaseFetcher, FetcherBaseProps } from "./base";

export * from "./abstraction";
export * from "./core";

export class Fetcher extends BaseFetcher implements IFullCarrotFetcher {
    subgraphFetcher;
    onChainFetcher;
    preferDecentralization;

    constructor({
        provider,
        ipfsGatewayURL,
        preferDecentralization,
    }: FetcherBaseProps) {
        super({ provider, ipfsGatewayURL });
        this.subgraphFetcher = new SubgraphFetcher({
            provider: this.provider,
            ipfsGatewayURL: this.ipfsGatewayURL,
        });
        this.onChainFetcher = new OnChainFetcher({
            provider: this.provider,
            ipfsGatewayURL: this.ipfsGatewayURL,
        });
        this.preferDecentralization = preferDecentralization;
    }

    private async shouldUseSubgraph() {
        if (this.preferDecentralization) return false;
        const { chainId } = await this.provider.getNetwork();
        return this.subgraphFetcher.supportedInChain({ chainId });
    }

    private async getFetcher(): Promise<IPartialCarrotFetcher> {
        const shouldUseSubgraph = await this.shouldUseSubgraph();
        return shouldUseSubgraph ? this.subgraphFetcher : this.onChainFetcher;
    }

    public async fetchERC20Tokens({
        addresses,
    }: FetchERC20TokensParams): Promise<{ [address: string]: Token }> {
        if (!addresses || addresses.length === 0) return {};
        return new CoreFetcher({ provider: this.provider }).fetchERC20Tokens({
            addresses,
        });
    }

    public async fetchKPITokensAmount(): Promise<number> {
        const fetcher = await this.getFetcher();
        return fetcher.fetchKPITokensAmount();
    }

    public async fetchKPITokenAddresses({
        fromIndex,
        toIndex,
    }: FetchKPITokenAddressesParams): Promise<string[]> {
        const fetcher = await this.getFetcher();
        return fetcher.fetchKPITokenAddresses({
            fromIndex,
            toIndex,
        });
    }

    async fetchKPITokens({
        addresses,
        searchQuery,
    }: FetchEntitiesParams): Promise<{
        [address: string]: KPIToken;
    }> {
        const fetcher = await this.getFetcher();
        return fetcher.fetchKPITokens({
            addresses,
            searchQuery,
        });
    }

    async fetchOracles({
        addresses,
    }: FetchEntitiesParams): Promise<{ [address: string]: Oracle }> {
        const fetcher = await this.getFetcher();
        return fetcher.fetchOracles({
            addresses,
        });
    }

    async fetchKPITokenTemplates({
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const fetcher = await this.getFetcher();
        return fetcher.fetchKPITokenTemplates({
            ids,
        });
    }

    async fetchOracleTemplates({
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const fetcher = await this.getFetcher();
        return fetcher.fetchOracleTemplates({
            ids,
        });
    }
}
