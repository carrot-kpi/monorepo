import { type Tx, TxType } from "@carrot-kpi/react";
import { useAccount } from "wagmi";
import type { HostState } from "../state";
import { useSelector } from "../state/hooks";
import { deserializeTransaction } from "../utils/transactions";

export const useTransactions = (): Tx<TxType>[] => {
    const { chain } = useAccount();
    const emptyArray: Tx<TxType>[] = [];

    return useSelector<HostState, Tx<TxType>[]>((state) => {
        const serializedTransactionsMap = state.transactions[chain?.id || -1];
        if (!serializedTransactionsMap) return emptyArray;
        return Object.values(serializedTransactionsMap).map(
            deserializeTransaction,
        );
    });
};
