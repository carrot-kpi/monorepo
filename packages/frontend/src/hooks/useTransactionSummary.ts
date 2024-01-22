import { type Tx, TxType } from "@carrot-kpi/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePublicClient } from "wagmi";
import { getTransactionDetails, type TxDetails } from "../utils/transactions";

export const useTransactionDetails = (
    tx: Tx<TxType>,
): { loading: boolean } & TxDetails => {
    const { t } = useTranslation();
    const client = usePublicClient();

    const [loading, setLoading] = useState(false);
    const [txDetails, setTxDetails] = useState<TxDetails>({
        title: "",
        summary: "",
    });

    useEffect(() => {
        let cancelled = false;
        const getSummary = async () => {
            if (!cancelled) setLoading(true);
            try {
                const details = await getTransactionDetails(t, client, tx);
                if (!cancelled) {
                    setTxDetails(details);
                }
            } catch (error) {
                console.warn(
                    `could not get summary for transaction ${tx.hash}`,
                    error,
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void getSummary();
        return () => {
            cancelled = true;
        };
    }, [client, t, tx]);

    return { loading, ...txDetails };
};
