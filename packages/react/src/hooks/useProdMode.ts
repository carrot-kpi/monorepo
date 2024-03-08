import { useTemplatePreviewMode } from "./useTemplatePreviewMode";
import { useDevMode } from "./useDevMode";

export const useProdMode = () => {
    const devMode = useDevMode();
    const templatePreviewMode = useTemplatePreviewMode();

    return !devMode && !templatePreviewMode;
};
