import {
    Fetcher,
    ResolvedKPITokenWithData,
    KPI_TOKEN_ABI,
    ResolvedOracleWithData,
    ORACLE_ABI,
    ResolvedKPIToken,
} from "@carrot-kpi/sdk";
import { ReadContractConfig } from "@wagmi/core";
import { useEffect, useState } from "react";
import { Address, useContractReads, useProvider } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { usePreferDecentralization } from "./usePreferDecentralization";

export function useWatchKPIToken(
    kpiTokenOrAddress?: ResolvedKPIToken | string
): ResolvedKPITokenWithData | null {
    const provider = useProvider();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const [kpiToken, setKPIToken] = useState<ResolvedKPIToken | null>(
        typeof kpiTokenOrAddress === "string" ? null : kpiTokenOrAddress || null
    );
    const [kpiTokenWithData, setKPITokenWithData] =
        useState<ResolvedKPITokenWithData | null>(null);

    // in case an address was passed, fetch the kpi token
    useEffect(() => {
        if (kpiToken) return;
        if (typeof kpiTokenOrAddress !== "string") return;
        let cancelled = false;
        const fetchData = async () => {
            try {
                const kpiToken = (
                    await Fetcher.fetchKPITokens({
                        provider,
                        preferDecentralization,
                        addresses: [kpiTokenOrAddress],
                    })
                )[kpiTokenOrAddress];
                if (!kpiToken)
                    console.warn(
                        `no kpi token with address ${kpiTokenOrAddress} found`
                    );
                const resolvedKPIToken = (
                    await Fetcher.resolveKPITokens({
                        ipfsGatewayURL,
                        kpiTokens: [kpiToken],
                    })
                )[kpiTokenOrAddress];
                if (!cancelled) setKPIToken(resolvedKPIToken);
            } catch (error) {
                console.error(
                    `could not fetch kpi token with address ${kpiTokenOrAddress}`,
                    error
                );
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [
        ipfsGatewayURL,
        kpiToken,
        kpiTokenOrAddress,
        preferDecentralization,
        provider,
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
            ...(kpiToken?.oracles.reduce(
                (accumulator: Partial<ReadContractConfig>[], oracle) => {
                    accumulator.push({
                        address: oracle.address as Address,
                        abi: ORACLE_ABI,
                        functionName: "data",
                    });
                    accumulator.push({
                        address: oracle.address as Address,
                        abi: ORACLE_ABI,
                        functionName: "finalized",
                    });
                    return accumulator;
                },
                []
            ) || []),
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
                    readResults[i + 1] as unknown as boolean,
                    readResults[i] as unknown as string
                )
            );
        }

        setKPITokenWithData(
            ResolvedKPITokenWithData.from(
                kpiToken,
                updatedOracles,
                readResults[0] as unknown as string,
                readResults[1] as unknown as boolean
            )
        );
    }, [kpiToken, readResults]);

    return kpiTokenWithData;
}
