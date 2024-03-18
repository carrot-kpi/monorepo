import { type State, useSelector } from "@carrot-kpi/shared-state";

export const useEnvironment = () => {
    return useSelector<State, State["preferences"]["environment"]>(
        (state) => state.preferences.environment,
    );
};
