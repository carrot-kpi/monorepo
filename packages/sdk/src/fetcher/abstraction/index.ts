import { BigNumberish } from "@ethersproject/bignumber";
import { Provider } from "@ethersproject/providers";
import { ChainId } from "../../commons";
import { KpiToken } from "../../entities/kpi-token";
import { Oracle } from "../../entities/oracle";
import { Template } from "../../entities/template";
import { Token } from "../../entities/token";

export interface ICoreFetcher {
    fetchErc20Tokens(
        addresses: string[],
        provider: Provider
    ): Promise<{ [address: string]: Token }>;

    fetchContentFromIpfs(cids: string[]): Promise<{ [cid: string]: string }>;
}

export interface IPartialCarrotFetcher {
    supportedInChain(chainId: ChainId): boolean;

    fetchKpiTokens(
        provider: Provider,
        addresses?: string[]
    ): Promise<{ [address: string]: KpiToken }>;

    fetchOracles(
        provider: Provider,
        addresses?: string[]
    ): Promise<{ [address: string]: Oracle }>;

    fetchKpiTokenTemplates(
        provider: Provider,
        ids?: BigNumberish[]
    ): Promise<Template[]>;

    fetchOracleTemplates(
        provider: Provider,
        ids?: BigNumberish[]
    ): Promise<Template[]>;
}

export interface IFullCarrotFetcher {
    fetchKpiTokens(
        provider: Provider,
        preferDecentralization?: boolean,
        addresses?: string[]
    ): Promise<{ [address: string]: KpiToken }>;

    fetchOracles(
        provider: Provider,
        preferDecentralization?: boolean,
        addresses?: string[]
    ): Promise<{ [address: string]: Oracle }>;

    fetchKpiTokenTemplates(
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
