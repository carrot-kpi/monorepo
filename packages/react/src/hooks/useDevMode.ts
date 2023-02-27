import { State, useSelector } from "@carrot-kpi/shared-state";

export const useDevMode = () => {
    return useSelector<State, State["preferences"]["devMode"]>(
        (state) => state.preferences.devMode
    );
};
