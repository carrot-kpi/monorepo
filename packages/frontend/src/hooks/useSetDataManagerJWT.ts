import { useDispatch, setDataManagerJWT } from "@carrot-kpi/shared-state";

export function useSetDataManagerJWT() {
    const dispatch = useDispatch();

    return (jwt: string) => {
        dispatch(setDataManagerJWT(jwt));
    };
}
