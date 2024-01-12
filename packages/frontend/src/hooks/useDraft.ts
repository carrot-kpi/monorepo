import type { HostState } from "../state";
import { useSelector } from "../state/hooks";
import type { Draft } from "../state/reducers/drafts";

export const useDraft = (id: string): Draft | undefined => {
    return useSelector<HostState, Draft | undefined>((state) => {
        if (!state.drafts[id]) return undefined;
        return { id, state: state.drafts[id] };
    });
};
