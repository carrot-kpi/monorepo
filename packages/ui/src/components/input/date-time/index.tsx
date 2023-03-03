import React, { forwardRef, useRef, useState, useCallback } from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { TextInput } from "../text";
import { Popover } from "../../utils";
import { ReactComponent as Calendar } from "../../../assets/calendar.svg";
import { DateTimePicker, DateTimePickerProps } from "./picker";
import { useClickAway } from "react-use";
import dayjs from "dayjs";

export type DateTimeInputProps = Omit<
    BaseInputProps<Date>,
    "onChange" | "min" | "max"
> &
    DateTimePickerProps;

export const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>(
    function DateTimeInput(
        {
            id,
            label,
            helperText,
            error = false,
            variant,
            border,
            className,
            value,
            onChange,
            min,
            max,
            ...rest
        },
        ref
    ): ReactElement {
        const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
        const popoverRef = useRef<HTMLDivElement>(null);
        const [open, setOpen] = useState(false);

        useClickAway(popoverRef, () => {
            setOpen(false);
        });

        const handlePickerOpen = useCallback(() => {
            setOpen(true);
        }, []);

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
                    readOnly
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
                    {...rest}
                    onClick={handlePickerOpen}
                    value={
                        value ? dayjs(value).format("L HH:mm:ss") : undefined
                    }
                />
                <Popover
                    anchor={anchorEl}
                    ref={popoverRef}
                    open={open}
                    placement="bottom-start"
                >
                    <DateTimePicker
                        value={value}
                        onChange={onChange}
                        min={min}
                        max={max}
                    />
                </Popover>
            </>
        );
    }
);
