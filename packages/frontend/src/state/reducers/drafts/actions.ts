import type { SerializableObject } from "@carrot-kpi/react";
import { createAction } from "@reduxjs/toolkit";

export const addDraft = createAction<{
    id: number;
    templateId: number;
    draft: SerializableObject<object>;
}>("drafts/addDraft");

export const deleteDraft = createAction<{ id: number }>("drafts/deleteDraft");
