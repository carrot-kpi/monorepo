import { setIPFSGatewayURL, useDispatch } from "@carrot-kpi/shared-state";

export const useSetIPFSGatewayURL = () => {
    const dispatch = useDispatch();

    return (url: string) => {
        dispatch(setIPFSGatewayURL(url));
    };
};
