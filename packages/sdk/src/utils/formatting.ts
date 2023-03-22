import { commify, formatUnits } from "@ethersproject/units";
import { Amount } from "../entities/amount";
import { Token } from "../entities/token";

export const formatTokenAmount = (
    amount: Amount<Token>,
    withSymbol = true,
    nonZeroDecimalsAmount = 4
) => {
    let rawBaseAmount = formatDecimals(
        commify(formatUnits(amount.raw, amount.currency.decimals)),
        nonZeroDecimalsAmount
    );
    if (withSymbol)
        rawBaseAmount = `${rawBaseAmount} ${amount.currency.symbol}`;
    return rawBaseAmount;
};

export const formatDecimals = (number: string, decimalsAmount = 4) => {
    const decimalIndex = number.indexOf(".");
    if (decimalIndex === -1) return number;
    let i = decimalIndex + 1;
    while (i < number.length) {
        if (number[i] !== "0") {
            i += decimalsAmount;
            break;
        }
        i++;
    }
    return number.substring(0, i);
};
