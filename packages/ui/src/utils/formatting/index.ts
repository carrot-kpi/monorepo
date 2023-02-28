export const DAY_MS = 86_400_000;
export const HOUR_MS = 3_600_000;
export const MINUTE_MS = 60_000;
export const SECONDS_MS = 1_000;

export const enforceDoubleDigits = (n: number): string => {
    return n < 10 ? `0${n}` : n.toString();
};

export const formatCountDownString = (to: number) => {
    const duration = to - Date.now();
    if (duration <= 0) return "00D 00H 00M 00S";

    const daysLeft = Math.floor(duration / DAY_MS);
    const hoursLeft = Math.floor(duration / HOUR_MS) % 24;
    const minutesLeft = Math.floor(duration / MINUTE_MS) % 60;
    const secondsLeft = Math.floor(duration / SECONDS_MS) % 60;

    return `${enforceDoubleDigits(daysLeft)}D ${enforceDoubleDigits(
        hoursLeft
    )}H ${enforceDoubleDigits(minutesLeft)}M ${enforceDoubleDigits(
        secondsLeft
    )}S`;
};
