import type { Address, PublicClient } from "viem";
import { ChainId } from "../../commons";
import { KPIToken } from "../../entities/kpi-token";
import { Oracle } from "../../entities/oracle";
import { ResolvedTemplate, Template } from "../../entities/template";
import { Token } from "../../entities/token";
import type { ResolvedKPITokensMap, ResolvedOraclesMap } from "../types";

export interface FetchERC20TokensParams {
    publicClient: PublicClient;
    addresses: Address[];
}

export interface FetchContentFromIPFSParams {
    ipfsGatewayURL: string;
    cids: string[];
}

export interface ResolveKPITokensParams {
    ipfsGatewayURL: string;
    kpiTokens: KPIToken[];
}

export interface ResolveOraclesParams {
    ipfsGatewayURL: string;
    oracles: Oracle[];
}

export interface ResolveTemplatesParams {
    ipfsGatewayURL: string;
    templates: Template[];
}

export interface ICoreFetcher {
    fetchERC20Tokens(
        params: FetchERC20TokensParams,
    ): Promise<{ [address: Address]: Token }>;

    fetchContentFromIPFS(
        params: FetchContentFromIPFSParams,
    ): Promise<{ [cid: string]: string }>;

    resolveKPITokens(
        params: ResolveKPITokensParams,
    ): Promise<ResolvedKPITokensMap>;

    resolveOracles(params: ResolveOraclesParams): Promise<ResolvedOraclesMap>;

    resolveTemplates(
        params: ResolveTemplatesParams,
    ): Promise<ResolvedTemplate[]>;

    fetchBlacklistedKPITokens(
        params: FetchBlackListedKPITokensParams,
    ): Promise<Address[]>;
}

export interface SupportedInChainParams {
    chainId: ChainId;
}

export interface FetchKPITokensAmountParams {
    publicClient: PublicClient;
}

export interface FetchKPITokenAddressesParams {
    publicClient: PublicClient;
    blacklisted: Address[];
    fromIndex?: number;
    toIndex?: number;
}

export interface FetchLatestKpiTokenAddressesParams {
    publicClient: PublicClient;
    blacklisted: Address[];
    limit?: number;
}

export interface FetchOraclesParams {
    publicClient: PublicClient;
    addresses?: Address[];
}

export interface FetchKPITokensParams {
    publicClient: PublicClient;
    blacklisted: Address[];
    addresses?: Address[];
}

export interface FetchTemplatesParams {
    publicClient: PublicClient;
    ids?: number[];
}

export interface FetchTemplateParams {
    publicClient: PublicClient;
    id?: number;
}

export interface FetchBlackListedKPITokensParams {
    chainId: ChainId;
}

export interface IPartialCarrotFetcher {
    supportedInChain(params: SupportedInChainParams): boolean;

    fetchKPITokensAmount(params: FetchKPITokensAmountParams): Promise<number>;

    fetchKPITokenAddresses(
        params: FetchKPITokenAddressesParams,
    ): Promise<Address[]>;

    fetchLatestKPITokenAddresses(
        params: FetchLatestKpiTokenAddressesParams,
    ): Promise<Address[]>;

    fetchKPITokens(
        params: FetchKPITokensParams,
    ): Promise<{ [address: Address]: KPIToken }>;

    fetchOracles(
        params: FetchOraclesParams,
    ): Promise<{ [address: Address]: Oracle }>;

    fetchKPITokenTemplates(params: FetchTemplatesParams): Promise<Template[]>;

    fetchOracleTemplates(params: FetchTemplatesParams): Promise<Template[]>;
}

export interface DecentralizationParams {
    preferDecentralization?: boolean;
}

export type FullFetcherFetchKPITokensAmountParams = FetchKPITokensAmountParams &
    DecentralizationParams;

export type FullFetcherFetchKPITokenAddressesParams = Omit<
    FetchKPITokenAddressesParams,
    "blacklisted"
> &
    DecentralizationParams;

export type FullFetcherFetchLatestKPITokenAddressesParams = Omit<
    FetchLatestKpiTokenAddressesParams,
    "blacklisted"
> &
    DecentralizationParams;

export type FullFetcherFetchOraclesParams = FetchOraclesParams &
    DecentralizationParams;

export type FullFetcherFetchKPITokensParams = Omit<
    FetchKPITokensParams,
    "blacklisted"
> &
    DecentralizationParams;

export type FullFetcherFetchTemplatesParams = FetchTemplatesParams &
    DecentralizationParams;

export interface IFullCarrotFetcher {
    fetchERC20Tokens(
        params: FetchERC20TokensParams,
    ): Promise<{ [address: Address]: Token }>;

    fetchKPITokensAmount(
        params: FullFetcherFetchKPITokensAmountParams,
    ): Promise<number>;

    fetchKPITokenAddresses(
        params: FullFetcherFetchKPITokenAddressesParams,
    ): Promise<Address[]>;

    fetchLatestKPITokenAddresses(
        params: FullFetcherFetchLatestKPITokenAddressesParams,
    ): Promise<Address[]>;

    fetchKPITokens(
        params: FullFetcherFetchKPITokensParams,
    ): Promise<{ [address: Address]: KPIToken }>;

    fetchOracles(
        params: FullFetcherFetchOraclesParams,
    ): Promise<{ [address: Address]: Oracle }>;

    fetchKPITokenTemplates(
        params: FullFetcherFetchTemplatesParams,
    ): Promise<Template[]>;

    fetchOracleTemplates(
        params: FullFetcherFetchTemplatesParams,
    ): Promise<Template[]>;
}
