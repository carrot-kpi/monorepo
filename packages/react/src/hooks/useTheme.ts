import { type State, useSelector } from "@carrot-kpi/shared-state";

export const useTheme = () => {
    return useSelector<State, State["preferences"]["theme"]>(
        (state) => state.preferences.theme
    );
};
