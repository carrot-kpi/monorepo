import type { TokenInfo, TokenList } from "@uniswap/token-lists";

export type TokenInfoWithBalance = Omit<TokenInfo, "balance"> & {
    balance?: bigint | null;
};

export type TokenListWithBalance = Omit<TokenList, "tokens"> & {
    tokens: TokenInfoWithBalance[];
};
