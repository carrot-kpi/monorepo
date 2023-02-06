import React, { ReactElement } from "react";
import { formatCountDownString } from "../../utils/components";
import { Typography } from "../typography";
import { ReactComponent as ClockSvg } from "../../assets/clock.svg";
import { cva } from "class-variance-authority";

const rootStyles = cva(["cui-flex", "cui-gap-2", "cui-items-center"]);

const iconStyles = cva(["cui-stroke-black", "dark:cui-stroke-white"]);

export interface TimerProps {
    milliseconds: number;
    className?: {
        root?: string;
        icon?: string;
    };
}

export const Timer = ({
    milliseconds,
    className,
}: TimerProps): ReactElement => (
    <div className={rootStyles({ className: className?.root })}>
        <ClockSvg className={iconStyles({ className: className?.icon })} />
        <Typography variant="sm">
            {formatCountDownString(
                new Date(milliseconds).getTime() - new Date().getTime()
            )}
        </Typography>
    </div>
);
