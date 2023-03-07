import { BigNumberish } from "@ethersproject/bignumber";
import { Provider } from "@ethersproject/providers";
import { ChainId } from "../../commons";
import { KPIToken } from "../../entities/kpi-token";
import { Oracle } from "../../entities/oracle";
import { Template } from "../../entities/template";
import { Token } from "../../entities/token";

export interface FetchERC20TokensParams {
    provider: Provider;
    addresses: string[];
}

export interface FetchContentFromIPFSParams {
    cids: string[];
}

export interface ICoreFetcher {
    fetchERC20Tokens(
        params: FetchERC20TokensParams
    ): Promise<{ [address: string]: Token }>;

    fetchContentFromIPFS(
        params: FetchContentFromIPFSParams
    ): Promise<{ [cid: string]: string }>;
}

export interface SupportedInChainParams {
    chainId: ChainId;
}

export interface FetchKPITokensAmountParams {
    provider: Provider;
}

export interface FetchKPITokenAddressesParams {
    provider: Provider;
    fromIndex?: number;
    toIndex?: number;
}

export interface FetchEntitiesParams {
    provider: Provider;
    addresses?: string[];
    searchQuery?: string;
}

export interface FetchTemplatesParams {
    provider: Provider;
    ids?: BigNumberish[];
}

export interface FetchTemplateParams {
    provider: Provider;
    id?: BigNumberish;
}

export interface IPartialCarrotFetcher {
    supportedInChain(params: SupportedInChainParams): boolean;

    fetchKPITokensAmount(params: FetchKPITokensAmountParams): Promise<number>;

    fetchKPITokenAddresses(
        params: FetchKPITokenAddressesParams
    ): Promise<string[]>;

    fetchKPITokens(
        params: FetchEntitiesParams
    ): Promise<{ [address: string]: KPIToken }>;

    fetchOracles(
        params: FetchEntitiesParams
    ): Promise<{ [address: string]: Oracle }>;

    fetchKPITokenTemplates(params: FetchTemplatesParams): Promise<Template[]>;

    fetchOracleTemplates(params: FetchTemplatesParams): Promise<Template[]>;
}

export interface DecentralizationParams {
    preferDecentralization?: boolean;
}

export type FullFetcherFetchKPITokensAmountParams = FetchKPITokensAmountParams &
    DecentralizationParams;

export type FullFetcherFetchKPITokenAddressesParams =
    FetchKPITokenAddressesParams & DecentralizationParams;

export type FullFetcherFetchEntitiesParams = FetchEntitiesParams &
    DecentralizationParams;

export type FullFetcherFetchTemplatesParams = FetchTemplatesParams &
    DecentralizationParams;

export interface IFullCarrotFetcher {
    fetchERC20Tokens(
        params: FetchERC20TokensParams
    ): Promise<{ [address: string]: Token }>;

    fetchKPITokensAmount(
        params: FullFetcherFetchKPITokensAmountParams
    ): Promise<number>;

    fetchKPITokenAddresses(
        params: FetchKPITokenAddressesParams
    ): Promise<string[]>;

    fetchKPITokens(
        params: FullFetcherFetchEntitiesParams
    ): Promise<{ [address: string]: KPIToken }>;

    fetchOracles(
        params: FullFetcherFetchEntitiesParams
    ): Promise<{ [address: string]: Oracle }>;

    fetchKPITokenTemplates(
        params: FullFetcherFetchTemplatesParams
    ): Promise<Template[]>;

    fetchOracleTemplates(
        params: FullFetcherFetchTemplatesParams
    ): Promise<Template[]>;
}
