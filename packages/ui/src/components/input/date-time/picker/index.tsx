import dayjs, { Dayjs, UnitType } from "dayjs";
import React, { useCallback } from "react";
import { Typography } from "../../../data-display";
import { DatePicker, DatePickerProps } from "../../date/picker";
import { enforceDoubleDigits } from "../../../../utils/formatting";
import { cva } from "class-variance-authority";

const cellStyles = cva(
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
                true: ["cui-bg-green", "cui-text-black"],
                false: [
                    "cui-bg-white",
                    "cui-text-black",
                    "dark:cui-bg-black",
                    "dark:cui-text-white",
                ],
            },
        },
    }
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
    min,
    max,
}: DateTimePickerProps) => {
    const handleDateChange = useCallback(
        (newValue: Dayjs) => {
            if (!onChange) return;
            if (!value) onChange(newValue);
            else
                onChange(
                    value
                        .clone()
                        .date(newValue.date())
                        .month(newValue.month())
                        .year(newValue.year())
                );
        },
        [onChange, value]
    );

    const handleTimeChange = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (!onChange) return;
            const data = (event.target as HTMLLIElement).dataset.data;
            if (data !== undefined) {
                const [unit, newValue] = data.split("-");
                const parsedNewValue = parseInt(newValue);
                if (isNaN(parsedNewValue)) return;
                const clone = value ? value.clone() : dayjs();
                onChange(clone.set(unit as UnitType, parsedNewValue));
            }
        },
        [onChange, value]
    );

    return (
        <div className="cui-flex">
            <div className="cui-p-4">
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
                        root: "cui-p-3 cui-border-b cui-border-black dark:cui-border-white cui-text-center",
                    }}
                >
                    {value ? value.format("HH:mm:ss") : "--:--:--"}
                </Typography>
                <div className="cui-flex cui-h-full">
                    <div className="cui-h-60 cui-w-16 cui-py-2 cui-overflow-y-auto cui-border-r">
                        {HOURS.map((hour) => {
                            const selected = value?.format("HH") === hour;
                            return (
                                <Typography
                                    key={hour}
                                    className={{
                                        root: cellStyles({ selected }),
                                    }}
                                    onClick={handleTimeChange}
                                    data-data={`hour-${hour}`}
                                >
                                    {hour}
                                </Typography>
                            );
                        })}
                    </div>
                    <div className="cui-h-60 cui-w-16 cui-py-2 cui-overflow-y-auto cui-border-r">
                        {MINUTES_SECONDS.map((minute) => {
                            const selected = value?.format("mm") === minute;
                            return (
                                <Typography
                                    key={minute}
                                    className={{
                                        root: cellStyles({ selected }),
                                    }}
                                    onClick={handleTimeChange}
                                    data-data={`minute-${minute}`}
                                >
                                    {minute}
                                </Typography>
                            );
                        })}
                    </div>
                    <div className="cui-h-60 cui-w-16 cui-py-2 cui-overflow-y-auto cui-rounded-br-xxl">
                        {MINUTES_SECONDS.map((second) => {
                            const selected = value?.format("ss") === second;
                            return (
                                <Typography
                                    key={second}
                                    className={{
                                        root: cellStyles({ selected }),
                                    }}
                                    onClick={handleTimeChange}
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
