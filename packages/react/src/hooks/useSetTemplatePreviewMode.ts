import { setTemplatePreviewMode, useDispatch } from "@carrot-kpi/shared-state";

export const useSetTemplatePreviewMode = () => {
    const dispatch = useDispatch();

    return (templatePreviewMode: boolean) => {
        dispatch(setTemplatePreviewMode(templatePreviewMode));
    };
};
