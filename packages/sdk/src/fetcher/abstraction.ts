import type { Address, PublicClient } from "viem";
import { ChainId } from "../commons";
import { KPIToken } from "../entities/kpi-token";
import { Oracle } from "../entities/oracle";
import { ResolvedTemplate, Template } from "../entities/template";
import { Token } from "../entities/token";
import type { ResolvedKPITokensMap, ResolvedOraclesMap } from "./types";

export interface DecentralizationParams {
    preferDecentralization?: boolean;
}

export interface CIDDataFetchingParams extends DecentralizationParams {
    ipfsGatewayURL: string;
    dataCDNURL: string;
}

export interface FetchERC20TokensParams {
    publicClient: PublicClient;
    addresses: Address[];
}

export interface FetchCIDDataParams extends CIDDataFetchingParams {
    cids: string[];
}

export interface ResolveKPITokensParams extends CIDDataFetchingParams {
    kpiTokens: KPIToken[];
}

export interface ResolveOraclesParams extends CIDDataFetchingParams {
    oracles: Oracle[];
}

export interface ResolveTemplatesParams extends CIDDataFetchingParams {
    templates: Template[];
}

export interface ICoreFetcher {
    fetchERC20Tokens(
        params: FetchERC20TokensParams,
    ): Promise<{ [address: Address]: Token }>;

    fetchCIDData(
        params: FetchCIDDataParams,
    ): Promise<{ [cid: string]: string }>;

    resolveKPITokens(
        params: ResolveKPITokensParams,
    ): Promise<ResolvedKPITokensMap>;

    resolveOracles(params: ResolveOraclesParams): Promise<ResolvedOraclesMap>;

    resolveTemplates(
        params: ResolveTemplatesParams,
    ): Promise<ResolvedTemplate[]>;
}

export interface SupportedInChainParams {
    chainId: ChainId;
}

export interface FetchKPITokensAmountParams {
    publicClient: PublicClient;
}

export interface FetchKPITokenAddressesParams {
    publicClient: PublicClient;
    blacklisted?: Address[];
    fromIndex?: number;
    toIndex?: number;
}

export interface FetchLatestKpiTokenAddressesParams {
    publicClient: PublicClient;
    blacklisted?: Address[];
    limit?: number;
}

export interface FetchOraclesParams {
    publicClient: PublicClient;
    addresses?: Address[];
}

export interface FetchKPITokensParams {
    publicClient: PublicClient;
    blacklisted?: Address[];
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

export interface FetchTemplateFeatureEnabledForParams {
    publicClient: PublicClient;
    templateId: number;
    featureId: number;
    account: Address;
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

    fetchKPITokenTemplateFeatureEnabledFor(
        params: FetchTemplateFeatureEnabledForParams,
    ): Promise<boolean>;

    fetchOracleTemplateFeatureEnabledFor(
        params: FetchTemplateFeatureEnabledForParams,
    ): Promise<boolean>;
}

export type FullFetcherFetchKPITokensAmountParams = FetchKPITokensAmountParams &
    DecentralizationParams;

export type FullFetcherFetchKPITokenAddressesParams =
    FetchKPITokenAddressesParams & DecentralizationParams;

export type FullFetcherFetchLatestKPITokenAddressesParams =
    FetchLatestKpiTokenAddressesParams & DecentralizationParams;

export type FullFetcherFetchOraclesParams = FetchOraclesParams &
    DecentralizationParams;

export type FullFetcherFetchKPITokensParams = FetchKPITokensParams &
    DecentralizationParams;

export type FullFetcherFetchTemplatesParams = FetchTemplatesParams &
    DecentralizationParams;

export type FullFetcherFetchTemplateFeatureEnabledForParams =
    FetchTemplateFeatureEnabledForParams & DecentralizationParams;

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

    fetchKPITokenTemplateFeatureEnabledFor(
        params: FetchTemplateFeatureEnabledForParams,
    ): Promise<boolean>;

    fetchOracleTemplateFeatureEnabledFor(
        params: FetchTemplateFeatureEnabledForParams,
    ): Promise<boolean>;
}
