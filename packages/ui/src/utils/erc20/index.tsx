import { getAddress, isAddress } from "@ethersproject/address";
import { TokenInfoWithBalance } from "../../components/evm/erc20-token-picker/types";

const TRUST_WALLET_CHAIN: { [chainId: number]: string } = {
    100: "xdai",
    137: "polygon",
    1: "ethereum",
    42161: "arbitrum",
};

export const getDefaultERC20TokenLogoURL = (
    chainId?: number,
    address?: string
): string | null => {
    if (!chainId || !address || !isAddress(address)) return null;
    const prefix = TRUST_WALLET_CHAIN[chainId];
    if (!prefix) return null;
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${prefix}/assets/${getAddress(
        address
    )}/logo.png`;
};

export const filterERC20Tokens = (
    tokens: TokenInfoWithBalance[],
    searchQuery?: string
): TokenInfoWithBalance[] => {
    if (tokens.length === 0) return [];
    if (!searchQuery) return tokens;
    if (isAddress(searchQuery)) {
        const lowerCaseDebouncedSearchQuery = searchQuery.toLowerCase();
        const tokenByAddress = tokens.find(
            (token) =>
                token.address.toLowerCase() === lowerCaseDebouncedSearchQuery
        );
        return !!tokenByAddress ? [tokenByAddress] : [];
    }
    const lowercaseSearchParts = searchQuery
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter((s) => s.length > 0);
    if (lowercaseSearchParts.length === 0) return tokens;
    return tokens.filter((token) => {
        const { symbol, name } = token;
        return (
            (symbol && matchesSearch(symbol, lowercaseSearchParts)) ||
            (name && matchesSearch(name, lowercaseSearchParts))
        );
    });
};

const matchesSearch = (searched: string, parts: string[]): boolean => {
    const searchedParts = searched
        .toLowerCase()
        .split(/\s+/)
        .filter((s) => s.length > 0);
    return parts.every(
        (part) =>
            part.length === 0 ||
            searchedParts.some((searchedPart) => searchedPart.includes(part))
    );
};

export const sortERC20Tokens = (
    tokens: TokenInfoWithBalance[]
): TokenInfoWithBalance[] => {
    return tokens.sort((a, b) => {
        const balanceA = a.balance;
        const balanceB = b.balance;

        let result = 0;
        if (balanceA && balanceB)
            result = balanceA.gt(balanceB) ? -1 : balanceA.eq(balanceB) ? 0 : 1;
        else if (balanceA && balanceA.gt("0")) result = -1;
        else if (balanceB && balanceB.gt("0")) result = 1;
        if (result !== 0) return result;

        if (a.symbol && b.symbol)
            return a.symbol.toLowerCase() < b.symbol.toLowerCase() ? -1 : 1;
        else return a.symbol ? -1 : b.symbol ? -1 : 0;
    });
};

export const tokenInfoWithBalanceEquals = (
    tokenA?: TokenInfoWithBalance | null,
    tokenB?: TokenInfoWithBalance | null
): boolean => {
    return !!(
        tokenA &&
        tokenB &&
        tokenA.chainId === tokenB.chainId &&
        tokenA.address.toLowerCase() === tokenB.address.toLowerCase()
    );
};
