import { createReducer } from "@reduxjs/toolkit";
import { setModalOpen } from "../actions";
import type { ModalsState } from "../types";

const initialState: ModalsState = {
    open: false,
};

export const ModalsReducer = createReducer(initialState, (builder) =>
    builder.addCase(setModalOpen, (state, action) => {
        state.open = action.payload;
    })
);
