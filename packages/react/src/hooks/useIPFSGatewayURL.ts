import { State, useSelector } from "@carrot-kpi/shared-state";

export const useIPFSGatewayURL = () => {
    return useSelector<State, State["preferences"]["ipfsGatewayURL"]>(
        (state) => state.preferences.ipfsGatewayURL
    );
};
