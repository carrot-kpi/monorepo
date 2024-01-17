import { createReducer } from "@reduxjs/toolkit";
import { addDraft, deleteDraft } from "./actions";
import type { DraftsState } from "./types";

const initialState: DraftsState = {};

export const draftsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(addDraft, (state, action) => {
            const { id: draftId, templateId, draft } = action.payload;
            state[draftId] = { id: draftId, templateId, body: draft };
        })
        .addCase(deleteDraft, (state, action) => {
            if (!state[action.payload.id]) {
                console.warn(
                    `tried to delete draft with id ${action.payload.id}`,
                );
                return;
            }
            delete state[action.payload.id];
        }),
);
