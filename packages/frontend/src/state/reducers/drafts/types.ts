import type { SerializableObject } from "@carrot-kpi/react";

export interface Draft {
    id: string;
    // FIXME: fix type
    state: SerializableObject<object>;
}

export interface DraftsState {
    [draftId: string]: SerializableObject<Draft["state"]>;
}
