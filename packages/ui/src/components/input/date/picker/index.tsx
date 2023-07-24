import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useLayoutEffect, useState } from "react";
import ChevronLeft from "../../../../icons/chevron-left";
import ChevronRight from "../../../../icons/chevron-right";
import { type CalendarCell, getCalendarCells } from "../../../../utils/date";
import { Typography } from "../../../data-display";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { mergedCva } from "../../../../utils/components";

dayjs.extend(LocalizedFormat);

const iconStyles = mergedCva([
    "cui-w-4",
    "cui-h-4",
    "cui-cursor-pointer",
    "cui-text-black",
    "dark:cui-text-white",
]);

const weekdayStyles = mergedCva(
    [
        "cui-w-6",
        "cui-h-6",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
    ],
    {
        variants: {
            holiday: {
                true: ["cui-text-red", "dark:!cui-text-red"],
                false: ["cui-text-gray-600", "dark:cui-text-gray-500"],
            },
        },
    },
);

const cellStyles = mergedCva(
    [
        "cui-w-6",
        "cui-h-6",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
        "cui-rounded",
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
                    "dark:cui-bg-black",
                    "dark:cui-text-white",
                    ,
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
        compoundVariants: [
            {
                disabled: false,
                selected: false,
                className: [
                    "hover:cui-bg-gray-300",
                    "hover:dark:cui-bg-gray-600",
                ],
            },
        ],
    },
);

export interface DatePickerProps {
    onChange?: (date: Date) => void;
    value?: Date | null;
    min?: Date | null;
    max?: Date | null;
}

export const DatePicker = ({ value, onChange, min, max }: DatePickerProps) => {
    // this date is used to generate cells, and is generally set to the
    // first day of the month we're currently interested in (also changed
    // when the datepicker user wants to change months)
    const [lookupDate, setLookupDate] = useState<Dayjs>(
        value ? dayjs(value) : dayjs(),
    );
    const [cells, setCells] = useState<CalendarCell[]>([]);

    useLayoutEffect(() => {
        setCells(getCalendarCells(lookupDate));
    }, [lookupDate]);

    const handlePreviousMonth = useCallback(() => {
        setLookupDate(lookupDate.subtract(1, "month"));
    }, [lookupDate]);

    const handleNextMonth = useCallback(() => {
        setLookupDate(lookupDate.add(1, "month"));
    }, [lookupDate]);

    const handleCellClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (!onChange || !event.target) return;
            const index = (event.target as HTMLLIElement).dataset.index;
            if (index !== undefined) {
                const parsedIndex = parseInt(index);
                if (parsedIndex >= 0)
                    onChange(cells[parsedIndex].value.toDate());
            }
        },
        [cells, onChange],
    );

    return (
        <div className="cui-h-56 cui-w-52 cui-flex cui-flex-col cui-justify-between">
            <div className="cui-flex cui-items-center">
                <ChevronLeft
                    className={iconStyles()}
                    onClick={handlePreviousMonth}
                />
                <Typography className={{ root: "cui-flex-1 cui-text-center" }}>
                    {lookupDate.format("MMMM YYYY")}
                </Typography>
                <ChevronRight
                    className={iconStyles()}
                    onClick={handleNextMonth}
                />
            </div>
            <div className="cui-grid cui-grid-cols-7">
                {cells.slice(0, 7).map((cell) => {
                    const dayOfWeek = cell.value.day();
                    return (
                        <Typography
                            variant="sm"
                            key={dayOfWeek}
                            className={{
                                root: weekdayStyles({
                                    holiday: dayOfWeek === 0 || dayOfWeek === 6,
                                }),
                            }}
                            weight="medium"
                        >
                            {cell.value.format("dd")}
                        </Typography>
                    );
                })}
            </div>
            <div className="cui-grid cui-grid-cols-7 cui-grid-rows-4 cui-gap-1">
                {cells.map((cell, index) => {
                    const disabled =
                        (min && cell.value.isBefore(min, "day")) ||
                        (max && cell.value.isAfter(max, "day")) ||
                        cell.value.month() !== lookupDate.month();
                    const selected =
                        !disabled &&
                        value?.getMonth() === cell.value.month() &&
                        value?.getDate() === cell.value.date();
                    return (
                        <Typography
                            onClick={disabled ? undefined : handleCellClick}
                            key={index}
                            data-index={index}
                            className={{
                                root: cellStyles({
                                    disabled,
                                    selected,
                                }),
                            }}
                        >
                            {cell.text}
                        </Typography>
                    );
                })}
            </div>
        </div>
    );
};
