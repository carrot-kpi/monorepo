import React from "react";
import { Typography } from "../../../../typography";
import { Skeleton } from "../../../../skeleton";
import { formatDecimals } from "@carrot-kpi/sdk";
import { formatUnits } from "viem";

interface BalanceProps {
    balance?: bigint | null;
    decimals?: number;
    loading?: boolean;
}

export const Balance = ({ balance, decimals = 18, loading }: BalanceProps) => {
    if (!balance) return null;
    if (loading) return <Skeleton variant="sm" width="40px" />;

    return (
        <Typography
            variant="sm"
            className={{ root: "cui-pointer-events-none" }}
        >
            {formatDecimals({
                number: formatUnits(balance, decimals),
                decimalsAmount: 4,
            })}
        </Typography>
    );
};
