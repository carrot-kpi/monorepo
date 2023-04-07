import { createReducer } from "@reduxjs/toolkit";
import { setModalIsOpen } from "../actions";
import { ModalsState } from "../types";

const initialState: ModalsState = {
    isOpen: false,
};

export const ModalsReducer = createReducer(initialState, (builder) =>
    builder.addCase(setModalIsOpen, (state, action) => {
        state.isOpen = action.payload.isOpen;
    })
);
