import React, { ReactElement, useEffect, useState } from "react";
import { formatCountDownString } from "../../../utils/formatting";
import { Typography } from "../typography";
import { ReactComponent as ClockSvg } from "../../../assets/clock.svg";
import { cva } from "class-variance-authority";

const rootStyles = cva(["cui-flex", "cui-gap-2", "cui-items-center"]);

const iconStyles = cva([
    "cui-h-4",
    "cui-w-4",
    "cui-stroke-black",
    "dark:cui-stroke-white",
]);

export interface TimerProps {
    to: number;
    icon?: boolean;
    countdown?: boolean;
    className?: {
        root?: string;
        icon?: string;
    };
}

export const Timer = ({
    to,
    countdown,
    icon,
    className,
}: TimerProps): ReactElement => {
    const [countdownString, setCountdownString] = useState(
        formatCountDownString(to)
    );

    useEffect(() => {
        if (!countdown) return;
        const timer = setInterval(() => {
            setCountdownString(formatCountDownString(to));
        }, 1_000);
        return () => {
            clearInterval(timer);
        };
    }, [countdown, to]);

    return (
        <div className={rootStyles({ className: className?.root })}>
            {icon && (
                <ClockSvg
                    className={iconStyles({ className: className?.icon })}
                />
            )}
            <Typography variant="sm">{countdownString}</Typography>
        </div>
    );
};
