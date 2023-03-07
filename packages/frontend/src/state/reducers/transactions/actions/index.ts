import { ChainId } from "@carrot-kpi/sdk";
import { createAction } from "@reduxjs/toolkit";

export const addTransaction = createAction<{
    chainId: ChainId;
    txHash: string;
    serializedTx: string;
}>("transactions/addTransaction");

export const clearTransactions = createAction<{ chainId: ChainId }>(
    "transactions/clearTransactions"
);
