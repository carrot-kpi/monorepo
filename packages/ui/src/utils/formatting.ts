export const enforceDoubleDigits = (n: number): string => {
    return n < 10 ? `0${n}` : n.toString();
};
