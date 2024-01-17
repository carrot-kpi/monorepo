import type { SerializableObject } from "@carrot-kpi/react";
import { useDispatch } from "../state/hooks";
import { addDraft } from "../state/reducers/drafts";

export function useAddDraft<S extends SerializableObject<S>>() {
    const dispatch = useDispatch();

    return (id: number, templateId: number, draft: S) => {
        dispatch(
            addDraft({
                id,
                templateId,
                draft,
            }),
        );
    };
}
