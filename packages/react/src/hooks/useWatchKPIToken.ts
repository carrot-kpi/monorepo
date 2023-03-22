import {
    Fetcher,
    KPIToken,
    KPITokenWithData,
    KPI_TOKEN_ABI,
    OracleWithData,
    ORACLE_ABI,
} from "@carrot-kpi/sdk";
import { ReadContractConfig } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useContractReads, useProvider } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { usePreferDecentralization } from "./usePreferDecentralization";

export function useWatchKPIToken(
    kpiTokenOrAddress?: KPIToken | string
): KPITokenWithData | null {
    const provider = useProvider();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const [kpiToken, setKPIToken] = useState<KPIToken | null>(
        typeof kpiTokenOrAddress === "string" ? null : kpiTokenOrAddress || null
    );
    const [kpiTokenWithData, setKPITokenWithData] =
        useState<KPITokenWithData | null>(null);

    // in case an address was passed, fetch the kpi token
    useEffect(() => {
        if (kpiToken) return;
        if (typeof kpiTokenOrAddress !== "string") return;
        let cancelled = false;
        console.log("IM HERE");
        const fetchData = async () => {
            try {
                const kpiToken = (
                    await Fetcher.fetchKPITokens({
                        provider,
                        ipfsGatewayURL,
                        preferDecentralization,
                        addresses: [kpiTokenOrAddress],
                    })
                )[kpiTokenOrAddress];
                if (!kpiToken)
                    console.warn(
                        `no kpi token with address ${kpiTokenOrAddress} found`
                    );
                if (!cancelled) setKPIToken(kpiToken);
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
                address: kpiToken?.address,
                abi: KPI_TOKEN_ABI,
                functionName: "data",
            },
            {
                address: kpiToken?.address,
                abi: KPI_TOKEN_ABI,
                functionName: "finalized",
            },
            ...(kpiToken?.oracles.reduce(
                (accumulator: Partial<ReadContractConfig>[], oracle) => {
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
                },
                []
            ) || []),
        ],
        enabled: !!kpiToken,
        watch: true,
    });

    useEffect(() => {
        if (!readResults || !kpiToken) return;

        const updatedOracles: OracleWithData[] = [];
        for (let i = 0; i < kpiToken.oracles.length; i++) {
            const outdatedOracle = kpiToken.oracles[i];
            updatedOracles.push(
                new OracleWithData(
                    outdatedOracle.chainId,
                    outdatedOracle.address,
                    outdatedOracle.template,
                    readResults[i * 2 + 1] as unknown as boolean,
                    readResults[i * 2] as unknown as string
                )
            );
        }

        setKPITokenWithData(
            new KPITokenWithData(
                kpiToken.chainId,
                kpiToken.address,
                kpiToken.owner,
                kpiToken.template,
                updatedOracles,
                kpiToken.specification,
                kpiToken.expiration,
                kpiToken.creationTimestamp,
                readResults[1] as unknown as boolean,
                readResults[0] as unknown as string
            )
        );
    }, [kpiToken, readResults]);

    return kpiTokenWithData;
}
