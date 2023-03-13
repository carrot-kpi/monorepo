import { BigNumberish } from "@ethersproject/bignumber";
import { ChainId } from "../../commons";
import { KPIToken } from "../../entities/kpi-token";
import { Oracle } from "../../entities/oracle";
import { Template } from "../../entities/template";
import { Token } from "../../entities/token";

export interface FetchERC20TokensParams {
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

export interface FetchKPITokenAddressesParams {
    fromIndex?: number;
    toIndex?: number;
}

export interface FetchKPITokenAddressesParams {
    fromIndex?: number;
    toIndex?: number;
}

export interface FetchEntitiesParams {
    addresses?: string[];
    searchQuery?: string;
}

export interface FetchTemplatesParams {
    ids?: BigNumberish[];
}

export interface FetchTemplateParams {
    id?: BigNumberish;
}

export interface IPartialCarrotFetcher {
    supportedInChain(params: SupportedInChainParams): boolean;

    fetchKPITokensAmount(): Promise<number>;

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

export interface IFullCarrotFetcher {
    fetchERC20Tokens(
        params: FetchERC20TokensParams
    ): Promise<{ [address: string]: Token }>;

    fetchKPITokensAmount(): Promise<number>;

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
