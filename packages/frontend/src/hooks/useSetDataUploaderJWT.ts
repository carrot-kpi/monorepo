import { useDispatch, setDataUploaderJWT } from "@carrot-kpi/shared-state";

export function useSetDataUploaderJWT() {
    const dispatch = useDispatch();

    return (jwt: string) => {
        dispatch(setDataUploaderJWT(jwt));
    };
}
