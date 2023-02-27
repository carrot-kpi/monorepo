import { setDevMode, useDispatch } from "@carrot-kpi/shared-state";

export const useSetDevMode = () => {
    const dispatch = useDispatch();

    return (devMode: boolean) => {
        dispatch(setDevMode(devMode));
    };
};
