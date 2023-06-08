import { type Tx, TxType } from "@carrot-kpi/react";
import { useNetwork } from "wagmi";
import type { HostState } from "../state";
import { useSelector } from "../state/connector";
import { deserializeTransaction } from "../utils/transactions";

export const useTransactions = (): Tx<TxType>[] => {
    const { chain } = useNetwork();

    return useSelector<HostState, Tx<TxType>[]>((state) => {
        if (!chain) return [];
        const serializedTransactionsMap = state.transactions[chain.id];
        if (!serializedTransactionsMap) return [];
        return Object.values(serializedTransactionsMap).map(
            deserializeTransaction
        );
    });
};
