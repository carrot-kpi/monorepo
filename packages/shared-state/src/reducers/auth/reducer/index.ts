import { createReducer } from "@reduxjs/toolkit";
import { setDataManagerJWT } from "../actions";
import type { AuthState } from "../types";

const initialState: AuthState = {
    dataManagerJWT: "",
};

export const authReducer = createReducer(initialState, (builder) =>
    builder.addCase(setDataManagerJWT, (state, action) => {
        state.dataManagerJWT = action.payload;
    }),
);
