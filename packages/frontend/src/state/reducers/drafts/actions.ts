import type { SerializableObject } from "@carrot-kpi/react";
import { createAction } from "@reduxjs/toolkit";

export const addDraft = createAction<{
    draftId: string;
    draft: SerializableObject<object>;
}>("drafts/addDraft");

export const deleteDraft = createAction<{ draftId: string }>(
    "drafts/deleteDraft",
);
