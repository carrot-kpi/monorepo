import React, {
    ReactElement,
    useCallback,
    useEffect,
    useState,
    MouseEvent as SpecificMouseEvent,
    useRef,
    forwardRef,
    ForwardedRef,
} from "react";
import { BaseInputProps, inputStyles, BaseInputWrapper } from "../commons";
import { ReactComponent as ChevronUp } from "../../assets/chevron-up.svg";
import { cva, cx } from "class-variance-authority";
import { Popover } from "../../popover";

const dropdownRootStyles = cva([
    "cui-rounded-xxl",
    "cui-border",
    "cui-bg-white",
    "dark:cui-bg-black",
    "dark:cui-border-white",
    "cui-z-10",
    "cui-overflow-hidden",
]);

const arrowStyles = cva(
    [
        "cui-select-caret",
        "cui-absolute",
        "cui-pointer-events-none",
        "cui-cursor-pointer",
        "cui-text-black",
        "dark:cui-text-white",
        "cui-right-4",
        "cui-top-1/2",
        "cui-transform",
        "-cui-translate-y-1/2",
    ],
    {
        variants: {
            open: {
                false: ["cui-rotate-180"],
            },
        },
        defaultVariants: {
            open: false,
        },
    }
);

const optionStyles = cva(
    [
        "cui-cursor-pointer",
        "cui-p-3",
        "cui-font-mono",
        "cui-font-normal",
        "cui-outline-none",
        "cui-placeholder-opacity-20",
        "dark:cui-placeholder-opacity-30",
        "cui-text-black",
        "dark:cui-text-white",
        "cui-box-border",
        "hover:cui-bg-gray-200",
        "dark:hover:cui-bg-gray-700",
    ],
    {
        variants: {
            picked: {
                true: [
                    "cui-bg-gray-300",
                    "hover:cui-bg-gray-300",
                    "dark:cui-bg-gray-600",
                    "dark:hover:cui-bg-gray-600",
                ],
            },
        },
        defaultVariants: {
            picked: false,
        },
    }
);

const selectAnchorStyles = cva(["cui-w-fit", "cui-relative"]);
const customOptionWrapperStyles = cva(["cui-pointer-events-none"]);

export interface SelectOption {
    label: string;
    value: ValueType;
    disabled?: boolean;
}

export type ValueType = string | number;

export type SelectProps<O extends SelectOption = SelectOption> = {
    options: O[];
    value: O | null;
    helperText?: string;
    error?: boolean;
    onChange: (value: O) => void;
    renderOption?: (value: O) => ReactElement;
    className?: BaseInputProps<unknown>["className"] & {
        inputRoot?: string;
        wrapper?: string;
        dropdownRoot?: string;
        option?: string;
        customOptionWrapper?: string;
    };
} & Omit<BaseInputProps<unknown>, "onChange" | "value">;

const Component = <O extends SelectOption>(
    {
        id,
        variant,
        label,
        border,
        options,
        helperText,
        error = false,
        value,
        onChange,
        className,
        renderOption,
        ...rest
    }: SelectProps<O>,
    ref: ForwardedRef<HTMLInputElement>
): ReactElement => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleCloseOnClick = (event: MouseEvent) => {
            if (!open || !dropdownRef.current || !anchorRef.current) return;
            if (
                !dropdownRef.current.contains(event.target as Node) &&
                !anchorRef.current.contains(event.target as Node)
            )
                setOpen(false);
        };

        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [open]);

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handlePick = useCallback(
        (event: SpecificMouseEvent<HTMLLIElement>) => {
            if (!event.target) return;
            const value = (event.target as HTMLLIElement).dataset.value;
            if (!!onChange && !!value) onChange(JSON.parse(value) as O);
            setOpen(false);
        },
        [onChange]
    );

    return (
        <div className={className?.root}>
            <BaseInputWrapper
                id={id}
                label={label}
                error={error}
                helperText={helperText}
                className={{ root: className?.inputRoot }}
            >
                <div
                    className={selectAnchorStyles({
                        className: className?.wrapper,
                    })}
                    ref={anchorRef}
                >
                    <input
                        id={id}
                        type="text"
                        readOnly
                        value={value?.label || ""}
                        ref={ref}
                        {...rest}
                        onClick={handleClick}
                        className={cx(
                            inputStyles({
                                error,
                                variant,
                                border,
                            }),
                            "cui-cursor-pointer",
                            className?.input
                        )}
                    />
                    <ChevronUp
                        className={arrowStyles({
                            open,
                        })}
                        onClick={handleClick}
                    />
                </div>
            </BaseInputWrapper>
            <Popover
                anchor={anchorRef.current}
                open={open}
                placement="bottom"
                className={{
                    root: dropdownRootStyles({
                        className: className?.dropdownRoot,
                    }),
                }}
                ref={dropdownRef}
            >
                <ul style={{ width: anchorRef.current?.clientWidth }}>
                    {options.map((option) => {
                        return (
                            <li
                                className={optionStyles({
                                    picked: value?.value === option.value,
                                    className: className?.option,
                                })}
                                onClick={handlePick}
                                data-value={JSON.stringify(option)}
                                key={option.label}
                            >
                                {!!renderOption ? (
                                    <div
                                        className={cx(
                                            customOptionWrapperStyles(),
                                            className?.customOptionWrapper
                                        )}
                                    >
                                        {renderOption(option)}
                                    </div>
                                ) : (
                                    option.label
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Popover>
        </div>
    );
};

export const Select = forwardRef(Component);
