import { createReducer } from "@reduxjs/toolkit";
import { setChainId } from "../actions";
import { ChainState } from "../types";
import { DEFAULT_CHAIN } from "../../../../constants";

const initialState: ChainState = {
    id: DEFAULT_CHAIN.id,
};

export const chainReducer = createReducer(initialState, (builder) =>
    builder.addCase(setChainId, (state, action) => {
        state.id = action.payload;
    })
);
