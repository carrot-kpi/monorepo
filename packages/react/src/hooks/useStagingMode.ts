import { State, useSelector } from "@carrot-kpi/shared-state";

export const useStagingMode = () => {
    return useSelector<State, State["preferences"]["stagingMode"]>(
        (state) => state.preferences.stagingMode
    );
};
