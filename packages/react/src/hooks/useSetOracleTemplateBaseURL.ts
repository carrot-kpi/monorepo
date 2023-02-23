import {
    setOracleTemplateBaseURL,
    useDispatch,
} from "@carrot-kpi/shared-state";

export const useSetOracleTemplateBaseURL = () => {
    const dispatch = useDispatch();

    return (url?: string) => {
        dispatch(setOracleTemplateBaseURL(url));
    };
};
