import dayjs, { type UnitType } from "dayjs";
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import { Typography } from "../../typography";
import { DatePicker, type DatePickerProps } from "../../date-input/picker";
import { enforceDoubleDigits } from "../../../utils/formatting";
import { mergedCva } from "../../../utils/components";
import {
    getUpdatedMinMaxValue,
    rectifyDate,
    resolvedValue,
} from "../../../utils/date";

const cellListStyles = mergedCva(
    [
        "cui-h-52",
        "cui-w-full md:cui-w-10",
        "cui-py-2",
        "cui-overflow-y-auto",
        "scrollbar-none",
        "cui-border-black",
    ],
    {
        variants: {
            border: {
                true: ["cui-border-r", "dark:cui-border-white"],
                false: ["cui-rounded-br-xxl"],
            },
        },
    },
);

const cellStyles = mergedCva(
    [
        "cui-flex",
        "cui-items-center",
        "cui-justify-center",
        "cui-h-7",
        "cui-cursor-pointer",
    ],
    {
        variants: {
            selected: {
                true: [
                    "cui-bg-green",
                    "cui-text-black",
                    "dark:!cui-text-black",
                ],
                false: [
                    "cui-bg-white",
                    "cui-text-black",
                    "hover:cui-bg-gray-300",
                    "dark:cui-bg-black",
                    "dark:cui-text-white",
                    "hover:dark:cui-bg-gray-600",
                ],
            },
            disabled: {
                true: [
                    "cui-text-gray-400",
                    "dark:!cui-text-gray-600",
                    "hover:cui-bg-white",
                    "hover:dark:cui-bg-black",
                    "cui-cursor-not-allowed",
                ],
                false: ["cui-cursor-pointer"],
            },
        },
    },
);

export type DateTimePickerProps = DatePickerProps;

const HOURS = new Array(24).fill(null).map((_, index) => {
    return enforceDoubleDigits(index);
});
const MINUTES_SECONDS = new Array(60).fill(null).map((_, index) => {
    return enforceDoubleDigits(index);
});

export const DateTimePicker = ({
    value,
    onChange,
    min: minDate,
    max: maxDate,
}: DateTimePickerProps) => {
    const [min, setMin] = useState(minDate);
    const [max, setMax] = useState(maxDate);

    // avoid inconsistent min and max values
    useEffect(() => {
        setMax((prevMax) => {
            const newMax = getUpdatedMinMaxValue(prevMax, maxDate);

            setMin((prevMin) => {
                let newMin = getUpdatedMinMaxValue(prevMin, minDate);
                if (dayjs(newMin).isAfter(dayjs(newMax), "seconds")) {
                    newMin = newMax;
                    console.warn("inconsistent min and max values", {
                        min: newMin?.toISOString(),
                        max: newMax?.toISOString(),
                    });
                }
                return newMin;
            });

            return newMax;
        });
    }, [maxDate, minDate]);

    // in case a value change happened, check if we're still
    // alright with validation and rectify if needed
    useLayoutEffect(() => {
        if (!value || !onChange) return;
        const originalValue = dayjs(value);
        const rectifiedValue = rectifyDate(dayjs(value), min, max);
        if (!originalValue.isSame(rectifiedValue, "seconds"))
            onChange(rectifiedValue.toDate());
    }, [max, min, onChange, value]);

    const handleDateChange = useCallback(
        (newValue: Date) => {
            if (!onChange) return;
            if (!value) onChange(newValue);
            else
                onChange(
                    dayjs(value)
                        .date(newValue.getDate())
                        .month(newValue.getMonth())
                        .year(newValue.getFullYear())
                        .toDate(),
                );
        },
        [onChange, value],
    );

    const handleTimeChange = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (!onChange) return;
            const data = (event.target as HTMLLIElement).dataset.data;
            if (data !== undefined) {
                const [unit, newValue] = data.split("-");
                const parsedNewValue = parseInt(newValue);
                if (isNaN(parsedNewValue)) return;
                const initialDate = resolvedValue(value, min, max);
                const pickedDate = initialDate.set(
                    unit as UnitType,
                    parsedNewValue,
                );
                onChange(rectifyDate(pickedDate, min, max).toDate());
            }
        },
        [max, min, onChange, value],
    );

    return (
        <div className="cui-flex cui-flex-col md:cui-flex-row cui-bg-white dark:cui-bg-black cui-rounded-xxl">
            <div className="cui-p-3 cui-pb-0 md:cui-p-3">
                <DatePicker
                    value={value}
                    onChange={handleDateChange}
                    min={min}
                    max={max}
                />
            </div>
            <div className="cui-w-[1px] cui-bg-black dark:cui-bg-white" />
            <div className="cui-flex cui-flex-col">
                <Typography
                    className={{
                        root: "cui-p-2 cui-border-black md:cui-border-b dark:cui-border-white cui-text-center",
                    }}
                >
                    {value ? dayjs(value).format("HH:mm:ss") : "--:--:--"}
                </Typography>
                <div className="cui-flex cui-h-full">
                    <div className={cellListStyles({ border: true })}>
                        {HOURS.map((hour) => {
                            const selected =
                                value && dayjs(value).format("HH") === hour;
                            let disabled = false;
                            if (value && (min || max)) {
                                const atTime = dayjs(value).hour(
                                    parseInt(hour),
                                );
                                disabled = !rectifyDate(
                                    atTime,
                                    min,
                                    max,
                                ).isSame(atTime);
                            }
                            return (
                                <Typography
                                    variant="sm"
                                    key={hour}
                                    className={{
                                        root: cellStyles({
                                            selected,
                                            disabled,
                                        }),
                                    }}
                                    onClick={
                                        disabled ? undefined : handleTimeChange
                                    }
                                    data-data={`hour-${hour}`}
                                >
                                    {hour}
                                </Typography>
                            );
                        })}
                    </div>
                    <div className={cellListStyles({ border: true })}>
                        {MINUTES_SECONDS.map((minute) => {
                            const selected =
                                value && dayjs(value).format("mm") === minute;
                            let disabled = false;
                            if (value) {
                                const atTime = dayjs(value).minute(
                                    parseInt(minute),
                                );
                                disabled = !rectifyDate(
                                    atTime,
                                    min,
                                    max,
                                ).isSame(atTime);
                            }
                            return (
                                <Typography
                                    variant="sm"
                                    key={minute}
                                    className={{
                                        root: cellStyles({
                                            selected,
                                            disabled,
                                        }),
                                    }}
                                    onClick={
                                        disabled ? undefined : handleTimeChange
                                    }
                                    data-data={`minute-${minute}`}
                                >
                                    {minute}
                                </Typography>
                            );
                        })}
                    </div>
                    <div className={cellListStyles({ border: false })}>
                        {MINUTES_SECONDS.map((second) => {
                            const selected =
                                value && dayjs(value).format("ss") === second;
                            let disabled = false;
                            if (value && (min || max)) {
                                const atTime = dayjs(value).second(
                                    parseInt(second),
                                );
                                disabled = !rectifyDate(
                                    atTime,
                                    min,
                                    max,
                                ).isSame(atTime);
                            }
                            return (
                                <Typography
                                    variant="sm"
                                    key={second}
                                    className={{
                                        root: cellStyles({
                                            selected,
                                            disabled,
                                        }),
                                    }}
                                    onClick={
                                        disabled ? undefined : handleTimeChange
                                    }
                                    data-data={`second-${second}`}
                                >
                                    {second}
                                </Typography>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
