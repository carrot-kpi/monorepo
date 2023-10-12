import { LATEST_KPI_TOKEN_QUERY_TAG, applicationApi } from "../state/api";
import { useDispatch } from "../state/hooks";

export const useInvalidateLatestKPITokens = () => {
    const dispatch = useDispatch();

    return () => {
        dispatch(
            applicationApi.util.invalidateTags([LATEST_KPI_TOKEN_QUERY_TAG]),
        );
    };
};
