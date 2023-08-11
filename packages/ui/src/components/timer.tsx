import React, { type ReactElement, useEffect, useState } from "react";
import { Typography, type TypographyProps } from "./typography";
import Clock from "../icons/clock";
import { mergedCva } from "../utils/components";
import { getDurationFromNowToUNIXTimestamp } from "../utils/date";

const rootStyles = mergedCva(["cui-flex", "cui-gap-2", "cui-items-center"]);

const iconStyles = mergedCva([
    "cui-text-black",
    "dark:cui-text-white",
    "cui-w-5",
    "cui-h-5",
]);

export interface TimerProps {
    to: number;
    icon?: boolean;
    countdown?: boolean;
    variant?: TypographyProps["variant"];
    seconds?: boolean;
    className?: {
        root?: string;
        icon?: string;
    };
}

export const Timer = ({
    to,
    countdown,
    variant,
    icon,
    seconds,
    className,
}: TimerProps): ReactElement => {
    const [duration, setDuration] = useState(
        getDurationFromNowToUNIXTimestamp(to),
    );

    useEffect(() => {
        if (!countdown) return;
        const timer = setInterval(() => {
            setDuration(getDurationFromNowToUNIXTimestamp(to));
        }, 1_000);
        return () => {
            clearInterval(timer);
        };
    }, [countdown, duration, to]);

    return (
        <Typography
            variant={variant}
            className={{ root: rootStyles({ className: className?.root }) }}
        >
            {icon && (
                <Clock className={iconStyles({ className: className?.icon })} />
            )}
            {duration.format(
                seconds ? "DD[D] HH[H] mm[M] ss[S]" : "DD[D] HH[H] mm[M]",
            )}
        </Typography>
    );
};
