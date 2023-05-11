import { Tx, TxType } from "@carrot-kpi/react";
import { trackRegisteredGoal } from "use-fathom-client";
import { useNetwork } from "wagmi";
import { useDispatch } from "../state/connector";
import { addTransaction } from "../state/reducers/transactions";
import { serializeTransaction } from "../utils/transactions";
import { TX_FATHOM_EVENTS } from "../analytics/fathom";
import { FathomRegisteredEventName } from "../out/fathom/types";

export const useAddTransaction = () => {
    const dispatch = useDispatch();
    const { chain } = useNetwork();

    return <T extends TxType>(tx: Tx<T>) => {
        if (!chain) {
            console.warn(`could not add transaction: chain is undefined`);
            return;
        }
        dispatch(
            addTransaction({
                chainId: chain.id,
                txHash: tx.hash,
                serializedTx: serializeTransaction(tx),
            })
        );
        try {
            trackRegisteredGoal<FathomRegisteredEventName>(
                TX_FATHOM_EVENTS[tx.type],
                0
            );
        } catch (error) {
            console.warn("could not track registered fathom goal", error);
        }
    };
};
