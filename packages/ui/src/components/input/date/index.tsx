import React, {
    forwardRef,
    useRef,
    useState,
    useCallback,
    useEffect,
    useLayoutEffect,
} from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import dayjs, { Dayjs } from "dayjs";
import { TextInput } from "../text";
import { Popover } from "../../utils";
import { CalendarCell, getCalendarCells } from "../../../utils/date";
import { Typography } from "../../data-display";
import { ReactComponent as ChevronLeft } from "../../../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../../assets/chevron-right.svg";
import { ReactComponent as Calendar } from "../../../assets/calendar.svg";
import { cva } from "class-variance-authority";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

const weekdayStyles = cva(
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
                true: ["cui-text-red"],
                false: ["cui-text-black"],
            },
        },
    }
);

const cellStyles = cva(
    [
        "cui-w-6",
        "cui-h-6",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
    ],
    {
        variants: {
            disabled: {
                true: ["cui-text-gray-300"],
                false: ["cui-cursor-pointer"],
            },
            selected: {
                true: ["cui-bg-green", "cui-text-black", "cui-rounded"],
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

export type DateInputProps = Omit<BaseInputProps<Dayjs>, "onChange"> & {
    onChange: (value: Dayjs) => void;
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
    function DateInput(
        {
            id,
            label,
            helperText,
            error = false,
            variant,
            border,
            className,
            value = dayjs(),
            onChange,
        },
        ref
    ): ReactElement {
        const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
        const popoverRef = useRef<HTMLDivElement>(null);
        const [open, setOpen] = useState(false);
        // this date is used to generate cells, and is generally set to the
        // first day of the month we're currently interested in (also changed
        // when the datepicker user wants to change months)
        const [lookupDate, setLookupDate] = useState<Dayjs>(value);
        const [cells, setCells] = useState<CalendarCell[]>([]);

        useLayoutEffect(() => {
            setCells(getCalendarCells(lookupDate));
        }, [lookupDate]);

        useEffect(() => {
            const handleCloseOnClick = (event: MouseEvent) => {
                if (
                    !!popoverRef.current &&
                    !popoverRef.current.contains(event.target as Node)
                )
                    setOpen(false);
            };
            document.addEventListener("mousedown", handleCloseOnClick);
            return () => {
                document.removeEventListener("mousedown", handleCloseOnClick);
            };
        }, []);

        const handlePickerOpen = useCallback(() => {
            setOpen(true);
        }, []);

        const handlePreviousMonth = useCallback(() => {
            setLookupDate(lookupDate.subtract(1, "month"));
        }, [lookupDate]);

        const handleNextMonth = useCallback(() => {
            setLookupDate(lookupDate.add(1, "month"));
        }, [lookupDate]);

        const handleCellClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                if (!event.target) return;
                const index = (event.target as HTMLLIElement).dataset.index;
                if (index !== undefined) {
                    const parsedIndex = parseInt(index);
                    if (parsedIndex >= 0) {
                        onChange(cells[parsedIndex].value);
                        setOpen(false);
                    }
                }
            },
            [cells, onChange]
        );

        return (
            <>
                <TextInput
                    ref={(element) => {
                        if (ref) {
                            if (typeof ref === "function") ref(element);
                            else ref.current = element;
                        }
                        setAnchorEl(element);
                    }}
                    id={id}
                    label={label}
                    error={error}
                    variant={variant}
                    border={border}
                    helperText={helperText}
                    icon={Calendar}
                    className={{
                        input: "cui-cursor-pointer",
                        inputIconWrapper: "cui-cursor-pointer",
                        ...className,
                    }}
                    onClick={handlePickerOpen}
                    value={value.format("L")}
                />
                <Popover
                    anchor={anchorEl}
                    ref={popoverRef}
                    open={open}
                    placement="bottom-start"
                    className={{
                        root: "cui-p-3 cui-flex cui-flex-col cui-gap-3",
                    }}
                >
                    <div className="cui-flex cui-items-center">
                        <ChevronLeft
                            className="cui-w-4 cui-h-4 cui-cursor-pointer"
                            onClick={handlePreviousMonth}
                        />
                        <div className="cui-flex-1 cui-text-center">
                            {lookupDate.format("MMMM YYYY")}
                        </div>
                        <ChevronRight
                            className="cui-w-4 cui-h-4 cui-cursor-pointer"
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
                                            holiday:
                                                dayOfWeek === 0 ||
                                                dayOfWeek === 6,
                                        }),
                                    }}
                                    weight="medium"
                                >
                                    {cell.value.format("dd")}
                                </Typography>
                            );
                        })}
                    </div>
                    <div className="cui-grid cui-grid-cols-7 cui-grid-rows-4 cui-gap-2">
                        {cells.map((cell, index) => {
                            const disabled =
                                cell.value.month() !== lookupDate.month();
                            const selected = value.unix() === cell.value.unix();
                            return (
                                <Typography
                                    onClick={handleCellClick}
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
                </Popover>
            </>
        );
    }
);
