import React, {
    forwardRef,
    useRef,
    useState,
    useCallback,
    useId,
    useEffect,
} from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import dayjs from "dayjs";
import { TextInput } from "../text";
import { Modal, Popover } from "../../utils";
import { ReactComponent as Calendar } from "../../../assets/calendar.svg";
import { DatePicker, DatePickerProps } from "./picker";
import { useClickAway } from "react-use";

export type DateInputProps = Omit<
    BaseInputProps<Date>,
    "onChange" | "min" | "max" | "id"
> &
    DatePickerProps & { id?: string };

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
    function DateInput(
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
            ...rest
        },
        ref
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
        });

        const handlePickerOpen = useCallback(() => {
            setOpen(true);
        }, []);

        const handlePickerClose = useCallback(() => {
            setOpen(false);
        }, []);

        const handleChange = useCallback(
            (value: Date) => {
                if (onChange) onChange(value);
                setOpen(false);
            },
            [onChange]
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
                    readOnly
                    id={resolvedId}
                    label={label}
                    error={error}
                    variant={variant}
                    border={border}
                    errorText={errorText}
                    info={info}
                    icon={Calendar}
                    className={{
                        ...className,
                        input: `cui-cursor-pointer ${className?.input}`,
                        inputIconWrapper: `cui-cursor-pointer ${className?.inputIconWrapper}`,
                    }}
                    {...rest}
                    onClick={handlePickerOpen}
                    value={value ? dayjs(value).format("L") : undefined}
                />
                {modal ? (
                    <Modal open={open} onDismiss={handlePickerClose}>
                        <div className="cui-p-3 cui-rounded-xxl cui-bg-white dark:cui-bg-black">
                            <DatePicker
                                value={value}
                                onChange={handleChange}
                                min={min}
                                max={max}
                            />
                        </div>
                    </Modal>
                ) : (
                    <Popover
                        anchor={anchorEl}
                        ref={popoverRef}
                        open={open}
                        placement="bottom-start"
                        className={{
                            root: "cui-p-3 cui-flex cui-flex-col cui-gap-3",
                        }}
                    >
                        <DatePicker
                            onChange={handleChange}
                            value={value}
                            min={min}
                            max={max}
                        />
                    </Popover>
                )}
            </>
        );
    }
);
