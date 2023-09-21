import { formatUnits } from "viem";
import { Amount } from "../entities/amount";
import type { Currency } from "../entities/currency";

export interface FormatCurrencyAmountParams {
    amount: Amount<Currency>;
    withSymbol?: boolean;
    commify?: boolean;
    nonZeroDecimalsAmount?: number;
}

export const formatCurrencyAmount = ({
    amount,
    withSymbol = true,
    commify = true,
    nonZeroDecimalsAmount = 4,
}: FormatCurrencyAmountParams) => {
    const rawBaseAmount = formatDecimals({
        number: formatUnits(amount.raw, amount.currency.decimals),
        decimalsAmount: nonZeroDecimalsAmount,
        commify,
    });
    return withSymbol
        ? `${rawBaseAmount} ${amount.currency.symbol}`
        : rawBaseAmount;
};

export interface FormatDecimalsParams {
    number: string;
    decimalsAmount?: number;
    commify?: boolean;
}

export const formatDecimals = ({
    number,
    decimalsAmount = 4,
    commify = true,
}: FormatDecimalsParams): string => {
    const decimalIndex = number.indexOf(".");
    if (decimalIndex === -1)
        return commify ? Number(number).toLocaleString() : number;
    let i = decimalIndex + 1;
    while (i < number.length) {
        if (number[i] !== "0") {
            i += decimalsAmount;
            break;
        }
        i++;
    }
    return commify
        ? Number(number.substring(0, i)).toLocaleString()
        : number.substring(0, i);
};
