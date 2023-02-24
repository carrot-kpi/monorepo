import {
    setKPITokenTemplateBaseURL,
    useDispatch,
} from "@carrot-kpi/shared-state";

export const useSetKPITokenTemplateBaseURL = () => {
    const dispatch = useDispatch();

    return (url?: string) => {
        dispatch(setKPITokenTemplateBaseURL(url));
    };
};
