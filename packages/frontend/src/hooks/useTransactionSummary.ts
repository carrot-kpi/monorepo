import { Tx, TxType } from "@carrot-kpi/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProvider } from "wagmi";
import { getTransactionSummary } from "../utils/transactions";

export const useTransactionSummary = (
    tx: Tx<TxType>
): { loading: boolean; summary: string } => {
    const { t } = useTranslation();
    const provider = useProvider();

    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        let cancelled = false;
        const getSummary = async () => {
            if (!cancelled) setLoading(true);
            try {
                const summary = await getTransactionSummary(t, provider, tx);
                if (!cancelled) setSummary(summary);
            } catch (error) {
                console.warn(
                    `could not get summary for transaction ${tx.hash}`,
                    error
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void getSummary();
        return () => {
            cancelled = true;
        };
    }, [provider, t, tx]);

    return { loading, summary };
};
