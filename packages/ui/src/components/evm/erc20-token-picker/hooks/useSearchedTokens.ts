import { useMemo } from "react";
import { filterERC20Tokens, sortERC20Tokens } from "../../../../utils/erc20";
import type { TokenInfoWithBalance, TokenListWithBalance } from "../types";

export const useSearchedTokens = (
    debouncedQuery?: string,
    chainId?: number,
    selectedList?: TokenListWithBalance | null,
): { tokens: TokenInfoWithBalance[] } => {
    const tokensInChain = useMemo(() => {
        if (!selectedList || !chainId) return [];
        return selectedList.tokens.filter((token) => token.chainId === chainId);
    }, [chainId, selectedList]);

    const filteredSortedTokens = useMemo(() => {
        return sortERC20Tokens(
            filterERC20Tokens(tokensInChain, debouncedQuery),
        );
    }, [debouncedQuery, tokensInChain]);

    return {
        tokens: filteredSortedTokens,
    };
};
