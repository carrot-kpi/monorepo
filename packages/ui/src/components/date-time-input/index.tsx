import React, {
    forwardRef,
    useRef,
    useState,
    useCallback,
    useId,
    useEffect,
} from "react";
import type { ReactElement } from "react";
import type { BaseInputProps } from "../commons/input";
import { TextInput } from "../text-input";
import { Modal } from "../modal";
import { Popover } from "../popover";
import Calendar from "../../icons/calendar";
import { DateTimePicker, type DateTimePickerProps } from "./picker";
import { useClickAway } from "react-use";
import dayjs from "dayjs";

export type DateTimeInputProps = Omit<
    BaseInputProps<Date>,
    "onChange" | "min" | "max" | "id"
> &
    Omit<DateTimePickerProps, "dataTestIds"> & {
        dataTestIds?: {
            textInput?: string;
            dateTimePickerInput?: DateTimePickerProps["dataTestIds"];
        };
        id?: string;
    };

export const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>(
    function DateTimeInput(
        {
            id,
            label,
            errorText,
            error = false,
            info,
            variant,
            border,
            className,
            value,
            onChange,
            min,
            max,
            loading,
            disabled,
            dataTestIds,
            ...rest
        },
        ref,
    ): ReactElement {
        const generatedId = useId();
        const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
        const popoverRef = useRef<HTMLDivElement>(null);
        const [open, setOpen] = useState(false);
        const [modal, setModal] = useState(false);

        const resolvedId = id || generatedId;

        useClickAway(popoverRef, () => {
            setOpen(false);
        });

        useEffect(() => {
            const resizeObserver = new ResizeObserver((entries) => {
                const { width } = entries[0].contentRect;
                if (width < 640) setModal(true);
                else setModal(false);
            });

            resizeObserver.observe(document.body);
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                resizeObserver.unobserve(document.body);
            };
        }, []);

        const handlePickerOpen = useCallback(() => {
            if (!open && (disabled || loading)) return;
            setOpen(true);
        }, [disabled, loading, open]);

        const handlePickerClose = useCallback(() => {
            setOpen(false);
        }, []);

        return (
            <>
                <TextInput
                    data-testid={dataTestIds?.textInput}
                    ref={(element) => {
                        if (ref) {
                            if (typeof ref === "function") ref(element);
                            else ref.current = element;
                        }
                        setAnchorEl(element);
                    }}
                    id={resolvedId}
                    readOnly
                    label={label}
                    error={error}
                    variant={variant}
                    border={border}
                    errorText={errorText}
                    info={info}
                    icon={Calendar}
                    disabled={disabled}
                    loading={loading}
                    className={{
                        ...className,
                        input: `cui-cursor-pointer ${className?.input}`,
                        inputIconWrapper: `cui-cursor-pointer ${className?.inputIconWrapper}`,
                    }}
                    {...rest}
                    onClick={handlePickerOpen}
                    value={
                        value ? dayjs(value).format("L HH:mm:ss") : undefined
                    }
                />
                {modal ? (
                    <Modal open={open} onDismiss={handlePickerClose}>
                        <DateTimePicker
                            value={value}
                            onChange={onChange}
                            min={min}
                            max={max}
                            dataTestIds={dataTestIds?.dateTimePickerInput}
                        />
                    </Modal>
                ) : (
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
                            dataTestIds={dataTestIds?.dateTimePickerInput}
                        />
                    </Popover>
                )}
            </>
        );
    },
);
