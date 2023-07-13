import { useDispatch, setPinningProxyJWT } from "@carrot-kpi/shared-state";

export function useSetPinningProxyJWT() {
    const dispatch = useDispatch();

    return (jwt: string) => {
        dispatch(setPinningProxyJWT(jwt));
    };
}
