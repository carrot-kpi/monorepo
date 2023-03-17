import { useMemo } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { Address, erc20ABI, useContractReads } from "wagmi";
import {
    cachedTokenInfoWithBalanceInChain,
    filterERC20Tokens,
    sortERC20Tokens,
} from "../../../../utils/erc20";
import { TokenInfoWithBalance, TokenListWithBalance } from "../types";

export const useSearchedTokens = (
    debouncedQuery?: string,
    chainId?: number,
    selectedList?: TokenListWithBalance,
    withBalances?: boolean,
    connectedAccountAddress?: string
): { tokens: TokenInfoWithBalance[]; loadingBalances: boolean } => {
    const cachedImportedTokens = cachedTokenInfoWithBalanceInChain(chainId);
    const tokensInChain = useMemo(() => {
        if (!selectedList || !chainId) return [];
        return selectedList.tokens
            .filter((token) => token.chainId === chainId)
            .concat(cachedImportedTokens);
    }, [cachedImportedTokens, chainId, selectedList]);

    const {
        data: rawBalances,
        isLoading: loadingBalances,
        isFetching: fetchingBalances,
    } = useContractReads({
        contracts: tokensInChain.map((token) => {
            return {
                abi: erc20ABI,
                address: token.address as Address,
                chainId,
                functionName: "balanceOf",
                args: [connectedAccountAddress],
            };
        }),
        allowFailure: true,
        enabled: !!(withBalances && connectedAccountAddress),
    });

    const filteredSortedTokens = useMemo(() => {
        let filterableTokens = tokensInChain;
        if (rawBalances && rawBalances.length === tokensInChain.length) {
            filterableTokens = tokensInChain.map((token, index) => {
                return {
                    ...token,
                    balance: rawBalances[index] as unknown as BigNumber | null,
                };
            });
        }
        return sortERC20Tokens(
            filterERC20Tokens(filterableTokens, debouncedQuery)
        );
    }, [debouncedQuery, rawBalances, tokensInChain]);

    return {
        tokens: filteredSortedTokens,
        loadingBalances: loadingBalances || fetchingBalances,
    };
};
