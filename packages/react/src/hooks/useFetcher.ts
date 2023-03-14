import { useMemo } from "react";

import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useFetcher() {
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const provider = useProvider();

    const fetcher = useMemo(
        () =>
            new Fetcher({
                provider,
                ipfsGatewayURL,
                preferDecentralization,
            }),
        [provider, ipfsGatewayURL, preferDecentralization]
    );

    return fetcher;
}
