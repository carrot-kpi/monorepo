import { Token } from "../entities/token";
import { CACHER, ChainId } from "../commons";
import { warn } from "./invariant";
import { type Address } from "viem";

export const erc20TokenCachingKey = (chainId: number, address: Address) =>
    `erc20-${chainId}-${address}`;
export const blacklistedKPITokensCachingKey = (chainId: number) =>
    `blacklisted-kpi-tokens-${chainId}`;

interface SerializedERC20Token {
    chainId: number;
    address: Address;
    decimals: number;
    symbol: string;
    name: string;
}

export const cacheERC20Token = (token: Token, validUntil?: number) => {
    if (!validUntil || validUntil < Date.now()) {
        validUntil = Date.now() + 172_800_000; // 2 days by default
        warn(true, `invalid valid until while caching erc20 token`);
    }
    CACHER.set<SerializedERC20Token>(
        erc20TokenCachingKey(token.chainId, token.address),
        {
            chainId: token.chainId,
            address: token.address,
            decimals: token.decimals,
            symbol: token.symbol,
            name: token.name,
        },
        validUntil,
    );
};

export const cacheBlacklistedKPITokens = (
    addresses: Address[],
    chainId: ChainId,
    validUntil?: number,
) => {
    if (!validUntil || validUntil < Date.now()) {
        validUntil = Date.now() + 172_800_000; // 2 days by default
        warn(true, `invalid valid until while caching blacklisted kpi tokens`);
    }
    CACHER.set<Address[]>(
        blacklistedKPITokensCachingKey(chainId),
        addresses,
        validUntil,
    );
};

export const getCachedERC20Token = (
    chainId: number,
    address: Address,
): Token | undefined => {
    const serializedERC20Token = CACHER.get<SerializedERC20Token>(
        erc20TokenCachingKey(chainId, address),
    );
    if (!!!serializedERC20Token) return;
    return new Token(
        serializedERC20Token.chainId,
        serializedERC20Token.address,
        serializedERC20Token.decimals,
        serializedERC20Token.symbol,
        serializedERC20Token.name,
    );
};

export const getCachedBlacklistedKPITokens = (
    chainId: number,
): Address[] | undefined => {
    const serializedBlacklistedKPITokens = CACHER.get<Address[]>(
        blacklistedKPITokensCachingKey(chainId),
    );
    if (!!!serializedBlacklistedKPITokens) return;
    return serializedBlacklistedKPITokens;
};
