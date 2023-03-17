import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { Typography } from "../../../../../data-display";
import { Skeleton } from "../../../../../feedback";
import { formatBalance } from "../../../../../../utils/formatting";

interface BalanceProps {
    balance?: BigNumber | null;
    decimals?: number;
    loading?: boolean;
}

export const Balance = ({ balance, decimals, loading }: BalanceProps) => {
    if (loading) return <Skeleton variant="sm" width="40px" />;

    const formattedBalance = formatBalance(balance, decimals);
    if (balance && formattedBalance)
        return <Typography variant="sm">{formattedBalance}</Typography>;

    return null;
};
