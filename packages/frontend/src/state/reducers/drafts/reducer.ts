import { createReducer } from "@reduxjs/toolkit";
import { addDraft, deleteDraft } from "./actions";
import type { DraftsState } from "./types";

const initialState: DraftsState = {};

export const draftsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(addDraft, (state, action) => {
            const { draftId, draft } = action.payload;
            state[draftId] = draft;
        })
        .addCase(deleteDraft, (state, action) => {
            state[action.payload.draftId] = {};
        }),
);
