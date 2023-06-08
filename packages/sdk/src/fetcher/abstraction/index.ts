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
        params: FetchERC20TokensParams
    ): Promise<{ [address: Address]: Token }>;

    fetchContentFromIPFS(
        params: FetchContentFromIPFSParams
    ): Promise<{ [cid: string]: string }>;

    resolveKPITokens(
        params: ResolveKPITokensParams
    ): Promise<ResolvedKPITokensMap>;

    resolveOracles(params: ResolveOraclesParams): Promise<ResolvedOraclesMap>;

    resolveTemplates(
        params: ResolveTemplatesParams
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
    fromIndex?: number;
    toIndex?: number;
}

export interface FetchEntitiesParams {
    publicClient: PublicClient;
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

export interface IPartialCarrotFetcher {
    supportedInChain(params: SupportedInChainParams): boolean;

    fetchKPITokensAmount(params: FetchKPITokensAmountParams): Promise<number>;

    fetchKPITokenAddresses(
        params: FetchKPITokenAddressesParams
    ): Promise<Address[]>;

    fetchKPITokens(
        params: FetchEntitiesParams
    ): Promise<{ [address: Address]: KPIToken }>;

    fetchOracles(
        params: FetchEntitiesParams
    ): Promise<{ [address: Address]: Oracle }>;

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
    ): Promise<{ [address: Address]: Token }>;

    fetchKPITokensAmount(
        params: FullFetcherFetchKPITokensAmountParams
    ): Promise<number>;

    fetchKPITokenAddresses(
        params: FetchKPITokenAddressesParams
    ): Promise<Address[]>;

    fetchKPITokens(
        params: FullFetcherFetchEntitiesParams
    ): Promise<{ [address: Address]: KPIToken }>;

    fetchOracles(
        params: FullFetcherFetchEntitiesParams
    ): Promise<{ [address: Address]: Oracle }>;

    fetchKPITokenTemplates(
        params: FullFetcherFetchTemplatesParams
    ): Promise<Template[]>;

    fetchOracleTemplates(
        params: FullFetcherFetchTemplatesParams
    ): Promise<Template[]>;
}
