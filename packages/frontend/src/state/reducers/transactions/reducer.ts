import { createReducer } from "@reduxjs/toolkit";
import { addTransaction, clearTransactions } from "./actions";
import type { TransactionsState } from "./types";

const initialState: TransactionsState = {};

export const transactionsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(addTransaction, (state, action) => {
            const { chainId, txHash, serializedTx } = action.payload;
            if (!state[chainId]) state[chainId] = {};
            if (!!state[chainId][txHash])
                console.warn(`tried to add tx with hash ${txHash} twice`);
            state[chainId][txHash] = serializedTx;
        })
        .addCase(clearTransactions, (state, action) => {
            state[action.payload.chainId] = {};
        }),
);
