import { type State, useSelector } from "@carrot-kpi/shared-state";

export const useTemplatePreviewMode = () => {
    return useSelector<State, State["preferences"]["templatePreviewMode"]>(
        (state) => state.preferences.templatePreviewMode,
    );
};
