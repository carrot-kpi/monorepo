import {
    Environment,
    setEnvironment,
    useDispatch,
} from "@carrot-kpi/shared-state";

export const useSetEnvironment = () => {
    const dispatch = useDispatch();

    return (environment: Environment) => {
        dispatch(setEnvironment(environment));
    };
};
