import { createReducer } from "@reduxjs/toolkit";
import { setDataUploaderJWT } from "../actions";
import type { AuthState } from "../types";

const initialState: AuthState = {
    dataUploaderJWT: "",
};

export const authReducer = createReducer(initialState, (builder) =>
    builder.addCase(setDataUploaderJWT, (state, action) => {
        state.dataUploaderJWT = action.payload;
    }),
);
