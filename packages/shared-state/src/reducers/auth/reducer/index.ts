import { createReducer } from "@reduxjs/toolkit";
import { setPinningProxyJWT } from "../actions";
import type { AuthState } from "../types";

const initialState: AuthState = {
    pinningProxyJWT: "",
};

export const authReducer = createReducer(initialState, (builder) =>
    builder.addCase(setPinningProxyJWT, (state, action) => {
        state.pinningProxyJWT = action.payload;
    }),
);
