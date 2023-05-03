import { setStagingMode, useDispatch } from "@carrot-kpi/shared-state";

export const useSetStagingMode = () => {
    const dispatch = useDispatch();

    return (stagingMode: boolean) => {
        dispatch(setStagingMode(stagingMode));
    };
};
