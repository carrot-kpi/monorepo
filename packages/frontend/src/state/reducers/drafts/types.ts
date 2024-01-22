import type { SerializableObject } from "@carrot-kpi/react";

export interface Draft {
    id: number;
    templateId: number;
    body: SerializableObject<object>;
}

export interface DraftsState {
    [id: number]: Draft;
}
