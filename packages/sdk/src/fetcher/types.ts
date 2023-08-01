import type { Address } from "viem";
import type { ChainId } from "../commons";
import { KPIToken, ResolvedKPIToken } from "../entities/kpi-token";
import { Oracle, ResolvedOracle } from "../entities/oracle";

export type ChainKPITokensMap = Record<string, KPIToken>;
export type ResolvedKPITokensMap = Record<string, ResolvedKPIToken>;

export type ChainOraclesMap = Record<string, Oracle>;
export type ResolvedOraclesMap = Record<string, ResolvedOracle>;

export type FeaturedBlacklistedKPITokens = Record<
    ChainId,
    { featured: Address[]; blacklisted: Address[] }
>;
