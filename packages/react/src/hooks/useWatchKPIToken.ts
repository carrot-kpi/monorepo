import {
    Fetcher,
    ResolvedKPITokenWithData,
    KPI_TOKEN_ABI,
    ResolvedOracleWithData,
    ORACLE_ABI,
    ResolvedKPIToken,
} from "@carrot-kpi/sdk";
import { useEffect, useState } from "react";
import { type Address, useContractReads, usePublicClient } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { usePreferDecentralization } from "./usePreferDecentralization";

export function useWatchKPIToken(
    kpiTokenOrAddress?: ResolvedKPIToken | Address,
): ResolvedKPITokenWithData | null {
    const publicClient = usePublicClient();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const [kpiToken, setKPIToken] = useState<ResolvedKPIToken | null>(
        typeof kpiTokenOrAddress === "string"
            ? null
            : kpiTokenOrAddress || null,
    );
    const [kpiTokenWithData, setKPITokenWithData] =
        useState<ResolvedKPITokenWithData | null>(null);

    // in case an address was passed, fetch the kpi token (with retries)
    useEffect(() => {
        if (kpiToken) return;
        if (typeof kpiTokenOrAddress !== "string") return;
        let cancelled = false;
        const interval = setInterval(async () => {
            try {
                const kpiToken = (
                    await Fetcher.fetchKPITokens({
                        publicClient,
                        preferDecentralization,
                        addresses: [kpiTokenOrAddress],
                    })
                )[kpiTokenOrAddress];
                if (!kpiToken) return;
                const resolvedKPIToken = (
                    await Fetcher.resolveKPITokens({
                        ipfsGatewayURL,
                        kpiTokens: [kpiToken],
                    })
                )[kpiTokenOrAddress];
                if (!cancelled) {
                    setKPIToken(resolvedKPIToken);
                    clearInterval(interval);
                }
            } catch (error) {
                console.error(
                    `could not fetch kpi token with address ${kpiTokenOrAddress}`,
                    error,
                );
            }
        }, 1_000);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [
        ipfsGatewayURL,
        kpiToken,
        kpiTokenOrAddress,
        preferDecentralization,
        publicClient,
    ]);

    const { data: readResults } = useContractReads({
        contracts: [
            {
                address: kpiToken?.address as Address | undefined,
                abi: KPI_TOKEN_ABI,
                functionName: "data",
            },
            {
                address: kpiToken?.address as Address | undefined,
                abi: KPI_TOKEN_ABI,
                functionName: "finalized",
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(kpiToken?.oracles.reduce((accumulator: any[], oracle) => {
                accumulator.push({
                    address: oracle.address,
                    abi: ORACLE_ABI,
                    functionName: "data",
                });
                accumulator.push({
                    address: oracle.address,
                    abi: ORACLE_ABI,
                    functionName: "finalized",
                });
                return accumulator;
            }, []) || []),
        ],
        enabled: !!kpiToken,
        watch: true,
    });

    useEffect(() => {
        if (!readResults || !kpiToken) return;

        const updatedOracles: ResolvedOracleWithData[] = [];
        for (let i = 2; i < readResults.length; i += 2) {
            const outdatedOracle = kpiToken.oracles[i % 2];
            updatedOracles.push(
                new ResolvedOracleWithData(
                    outdatedOracle.chainId,
                    outdatedOracle.address,
                    outdatedOracle.template,
                    readResults[i + 1].result as boolean,
                    readResults[i].result as Address,
                ),
            );
        }

        setKPITokenWithData(
            ResolvedKPITokenWithData.from(
                kpiToken,
                updatedOracles,
                readResults[0].result as Address,
                readResults[1].result as boolean,
            ),
        );
    }, [kpiToken, readResults]);

    return kpiTokenWithData;
}
