import type { SerializableObject } from "@carrot-kpi/react";
import { createAction } from "@reduxjs/toolkit";

export const addDraft = createAction<{
    draftId: number;
    templateId: number;
    draft: SerializableObject<object>;
}>("drafts/addDraft");

export const deleteDraft = createAction<{ draftId: number }>(
    "drafts/deleteDraft",
);
