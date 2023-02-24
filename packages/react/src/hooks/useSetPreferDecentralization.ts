import {
    setPreferDecentralization,
    useDispatch,
} from "@carrot-kpi/shared-state";

export const useSetPreferDecentralization = () => {
    const dispatch = useDispatch();

    return (preferDecentralization: boolean) => {
        dispatch(setPreferDecentralization(preferDecentralization));
    };
};
