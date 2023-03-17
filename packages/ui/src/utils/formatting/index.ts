import Decimal from "decimal.js-light";
import { BigNumber } from "@ethersproject/bignumber";
import { commify, formatUnits } from "@ethersproject/units";

export const enforceDoubleDigits = (n: number): string => {
    return n < 10 ? `0${n}` : n.toString();
};

export const formatBalance = (
    rawAmount?: BigNumber | null,
    decimals?: number | null
) => {
    if (!rawAmount || !decimals) return null;
    if (rawAmount.isZero()) return "0";
    return commify(
        new Decimal(formatUnits(rawAmount, decimals)).toFixed(
            4,
            Decimal.ROUND_UP
        )
    );
};
