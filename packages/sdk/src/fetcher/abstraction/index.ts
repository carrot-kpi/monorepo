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

export interface FetchEntityParams {
    provider: Provider;
    addresses?: string[];
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

    fetchKPITokens(
        params: FetchEntityParams
    ): Promise<{ [address: string]: KPIToken }>;

    fetchOracles(
        params: FetchEntityParams
    ): Promise<{ [address: string]: Oracle }>;

    fetchKPITokenTemplates(params: FetchTemplatesParams): Promise<Template[]>;

    fetchOracleTemplates(params: FetchTemplatesParams): Promise<Template[]>;
}

export interface DecentralizationParams {
    preferDecentralization?: boolean;
}

export type FullFetcherFetchEntityParams = FetchEntityParams &
    DecentralizationParams;

export type FullFetcherFetchTemplatesParams = FetchTemplatesParams &
    DecentralizationParams;

export interface IFullCarrotFetcher {
    fetchERC20Tokens(
        params: FetchERC20TokensParams
    ): Promise<{ [address: string]: Token }>;

    fetchKPITokens(
        params: FullFetcherFetchEntityParams
    ): Promise<{ [address: string]: KPIToken }>;

    fetchOracles(
        params: FullFetcherFetchEntityParams
    ): Promise<{ [address: string]: Oracle }>;

    fetchKPITokenTemplates(
        params: FullFetcherFetchTemplatesParams
    ): Promise<Template[]>;

    fetchOracleTemplates(
        params: FullFetcherFetchTemplatesParams
    ): Promise<Template[]>;
}
