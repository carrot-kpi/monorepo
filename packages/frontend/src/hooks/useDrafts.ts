import type { HostState } from "../state";
import { useSelector } from "../state/hooks";
import type { Draft } from "../state/reducers/drafts";

export const useDrafts = (): Draft[] => {
    return useSelector<HostState, Draft[]>((state) => {
        return Object.keys(state.drafts).map((draftId) => ({
            id: draftId,
            state: state.drafts[draftId],
        }));
    });
};
