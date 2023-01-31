import { BigNumberish } from "@ethersproject/bignumber";
import { Provider } from "@ethersproject/providers";
import { ChainId } from "../../commons";
import { KPIToken } from "../../entities/kpi-token";
import { Oracle } from "../../entities/oracle";
import { Template } from "../../entities/template";
import { Token } from "../../entities/token";

export interface ICoreFetcher {
    fetchERC20Tokens(
        provider: Provider,
        addresses: string[]
    ): Promise<{ [address: string]: Token }>;

    fetchContentFromIPFS(cids: string[]): Promise<{ [cid: string]: string }>;
}

export interface IPartialCarrotFetcher {
    supportedInChain(chainId: ChainId): boolean;

    fetchKPITokens(
        provider: Provider,
        addresses?: string[]
    ): Promise<{ [address: string]: KPIToken }>;

    fetchOracles(
        provider: Provider,
        addresses?: string[]
    ): Promise<{ [address: string]: Oracle }>;

    fetchKPITokenTemplates(
        provider: Provider,
        ids?: BigNumberish[]
    ): Promise<Template[]>;

    fetchOracleTemplates(
        provider: Provider,
        ids?: BigNumberish[]
    ): Promise<Template[]>;
}

export interface IFullCarrotFetcher {
    fetchERC20Tokens(
        provider: Provider,
        addresses: string[]
    ): Promise<{ [address: string]: Token }>;

    fetchKPITokens(
        provider: Provider,
        preferDecentralization?: boolean,
        addresses?: string[]
    ): Promise<{ [address: string]: KPIToken }>;

    fetchOracles(
        provider: Provider,
        preferDecentralization?: boolean,
        addresses?: string[]
    ): Promise<{ [address: string]: Oracle }>;

    fetchKPITokenTemplates(
        provider: Provider,
        preferDecentralization?: boolean,
        ids?: BigNumberish[]
    ): Promise<Template[]>;

    fetchOracleTemplates(
        provider: Provider,
        preferDecentralization?: boolean,
        ids?: BigNumberish[]
    ): Promise<Template[]>;
}
