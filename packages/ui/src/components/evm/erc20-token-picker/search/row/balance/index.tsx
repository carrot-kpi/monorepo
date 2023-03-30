import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { Typography } from "../../../../../data-display";
import { Skeleton } from "../../../../../feedback";
import { formatDecimals } from "@carrot-kpi/sdk";
import { commify, formatUnits } from "@ethersproject/units";

interface BalanceProps {
    balance?: BigNumber | null;
    decimals?: number;
    loading?: boolean;
}

export const Balance = ({ balance, decimals, loading }: BalanceProps) => {
    if (!balance) return null;
    if (loading) return <Skeleton variant="sm" width="40px" />;

    return (
        <Typography
            variant="sm"
            className={{ root: "cui-pointer-events-none" }}
        >
            {formatDecimals(commify(formatUnits(balance, decimals)), 4)}
        </Typography>
    );
};
