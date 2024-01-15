import type { HostState } from "../state";
import { useSelector } from "../state/hooks";
import type { Draft } from "../state/reducers/drafts";

export const useDraft = (draftId: number): Draft | undefined => {
    return useSelector<HostState, Draft | undefined>((state) => {
        if (!state.drafts[draftId]) return undefined;
        return state.drafts[draftId];
    });
};
