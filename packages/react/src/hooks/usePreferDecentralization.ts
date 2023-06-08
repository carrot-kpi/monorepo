import { type State, useSelector } from "@carrot-kpi/shared-state";

export const usePreferDecentralization = () => {
    return useSelector<State, State["preferences"]["preferDecentralization"]>(
        (state) => state.preferences.preferDecentralization
    );
};
