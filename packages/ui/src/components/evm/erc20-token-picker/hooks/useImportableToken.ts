import { useEffect, useState } from "react";
import { isAddress } from "@ethersproject/address";
import { Address, useBalance, useToken } from "wagmi";
import { TokenInfoWithBalance } from "../types";

export const useImportableToken = (
    debouncedQuery?: string,
    chainId?: number,
    withBalances?: boolean,
    connectedAccountAddress?: string
): {
    importableToken?: TokenInfoWithBalance | null;
    loadingBalance: boolean;
} => {
    const [importableToken, setImportableToken] =
        useState<TokenInfoWithBalance | null>(null);

    const {
        data: rawImportableToken,
        isLoading: loadingImportableToken,
        isFetching: fetchingImportableToken,
    } = useToken({
        address: debouncedQuery as Address,
        chainId,
        enabled: !!(chainId && debouncedQuery && isAddress(debouncedQuery)),
    });

    const {
        data: rawBalance,
        isLoading: loadingBalance,
        isFetching: fetchingBalance,
    } = useBalance({
        address: connectedAccountAddress as Address,
        token: rawImportableToken?.address,
        enabled: !!(
            withBalances &&
            connectedAccountAddress &&
            rawImportableToken
        ),
    });

    // whenever the query is not an address anymore and the importable
    // token is there in the state, erase it
    useEffect(() => {
        if (!debouncedQuery || !isAddress(debouncedQuery))
            setImportableToken(null);
    }, [debouncedQuery]);

    // whenever the wagmi hook fetches an importable token, set it in
    // the internal state
    useEffect(() => {
        if (
            !chainId ||
            !rawImportableToken ||
            loadingImportableToken ||
            fetchingImportableToken
        )
            return;
        setImportableToken({ ...rawImportableToken, chainId });
    }, [
        chainId,
        fetchingImportableToken,
        loadingImportableToken,
        rawImportableToken,
    ]);

    // whenever the wagmi hook fetches the importable token balance,
    // update it
    useEffect(() => {
        if (
            !chainId ||
            !rawImportableToken ||
            loadingImportableToken ||
            fetchingImportableToken ||
            !rawBalance ||
            loadingBalance ||
            fetchingBalance
        )
            return;
        setImportableToken((prevState) => {
            if (!prevState) return null;
            return { ...prevState, balance: rawBalance.value };
        });
    }, [
        chainId,
        fetchingBalance,
        fetchingImportableToken,
        loadingBalance,
        loadingImportableToken,
        rawBalance,
        rawImportableToken,
    ]);

    return {
        importableToken,
        loadingBalance:
            loadingImportableToken ||
            fetchingImportableToken ||
            loadingBalance ||
            fetchingBalance,
    };
};
