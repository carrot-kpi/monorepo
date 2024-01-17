import { useMemo } from "react";
import type { HostState } from "../state";
import { useSelector } from "../state/hooks";
import type { Draft } from "../state/reducers/drafts";

export const useDrafts = (): Draft[] => {
    const drafts = useSelector<HostState, Record<number, Draft>>(
        (state) => state.drafts,
    );
    return useMemo(() => {
        return Object.keys(drafts).map((draftId) => {
            return drafts[parseInt(draftId)];
        });
    }, [drafts]);
};
