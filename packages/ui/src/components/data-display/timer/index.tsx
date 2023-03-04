import React, { ReactElement, useEffect, useState } from "react";
import { Typography, TypographyProps } from "../typography";
import { ReactComponent as ClockSvg } from "../../../assets/clock.svg";
import { mergedCva } from "../../../utils/components";
import dayjs from "dayjs";
import Duration from "dayjs/plugin/duration";

dayjs.extend(Duration);

const rootStyles = mergedCva(["cui-flex", "cui-gap-2", "cui-items-center"]);

const iconStyles = mergedCva(["cui-text-black", "dark:cui-text-white"]);

export interface TimerProps {
    to: number;
    icon?: boolean;
    countdown?: boolean;
    variant?: TypographyProps["variant"];
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
    className,
}: TimerProps): ReactElement => {
    const [duration, setDuration] = useState(
        dayjs.duration(dayjs.unix(to).diff(dayjs()))
    );

    useEffect(() => {
        if (!countdown) return;
        const timer = setInterval(() => {
            setDuration(dayjs.duration(dayjs.unix(to).diff(dayjs())));
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
                <ClockSvg
                    className={iconStyles({ className: className?.icon })}
                />
            )}
            {duration.format("DD[D] HH[H] mm[M] ss[S]")}
        </Typography>
    );
};
